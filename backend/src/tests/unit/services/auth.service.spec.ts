/**
 * Unit tests for AuthService
 * - Prisma, bcrypt, nodemailer, and JWT utilities are mocked.
 * - Tests both happy paths and error scenarios.
 * - Uses Arrange / Act / Assert pattern.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Prisma client
vi.mock('../../../config/prisma.js', () => {
  return {
    default: {
      user: {
        findUnique: vi.fn(),
        findFirst: vi.fn(),
        create: vi.fn(),
        update: vi.fn()
      }
    }
  };
});

// Mock bcrypt utilities
vi.mock('../../../utils/bcrypt.js', () => ({
  hashPassword: vi.fn(),
  comparePassword: vi.fn()
}));

// Mock email service
vi.mock('../../../services/email.service.js', () => ({
  default: {
    sendVerificationEmail: vi.fn()
  }
}));

// Mock JWT middleware
vi.mock('../../../middleware/middleware.js', () => ({
  generateToken: vi.fn()
}));

import prisma from '../../../config/prisma.js';
import { hashPassword, comparePassword } from '../../../utils/bcrypt.js';
import emailService from '../../../services/email.service.js';
import { generateToken } from '../../../middleware/middleware.js';
import AuthService from '../../../services/auth.service.js';

describe('AuthService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('register', () => {
    it('should successfully register a new user (Arrange / Act / Assert)', async () => {
      // Arrange
      const registerDto = { email: 'test@example.com', username: 'testuser', password: 'Password123!' };
      const mockUser = { user_id: BigInt(1), email: 'test@example.com', username: 'testuser', password: 'hashedpass' };
      const mockToken = 'jwt.token.here';

      (prisma.user.findUnique as any).mockResolvedValue(null); // email not registered
      (hashPassword as any).mockResolvedValue('hashedpass');
      (prisma.user.create as any).mockResolvedValue(mockUser);
      (generateToken as any).mockReturnValue(mockToken);
      (emailService.sendVerificationEmail as any).mockResolvedValue(undefined);

      // Act
      const result = await AuthService.register(registerDto);

      // Assert
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(hashPassword).toHaveBeenCalledWith('Password123!');
      expect(prisma.user.create).toHaveBeenCalled();
      expect(emailService.sendVerificationEmail).toHaveBeenCalled();
      expect(generateToken).toHaveBeenCalled();
      expect(result.token).toBe(mockToken);
      expect(result.userResponse).toBeDefined();
    });

    it('should throw error if email already registered', async () => {
      // Arrange
      const registerDto = { email: 'existing@example.com', username: 'newuser', password: 'Password123!' };
      const existingUser = { user_id: BigInt(1), email: 'existing@example.com' };

      (prisma.user.findUnique as any).mockResolvedValue(existingUser);

      // Act & Assert
      await expect(AuthService.register(registerDto)).rejects.toThrow('Email already registered');
    });
  });

  describe('login', () => {
    it('should successfully login user with valid credentials', async () => {
      // Arrange
      const loginDto = { email: 'user@example.com', password: 'Password123!' };
      const mockUser = { user_id: BigInt(1), email: 'user@example.com', password: 'hashedpass' };
      const mockToken = 'jwt.token.login';

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);
      (comparePassword as any).mockResolvedValue(true);
      (generateToken as any).mockReturnValue(mockToken);

      // Act
      const result = await AuthService.login(loginDto);

      // Assert
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'user@example.com' } });
      expect(comparePassword).toHaveBeenCalledWith('Password123!', 'hashedpass');
      expect(result.token).toBe(mockToken);
      expect(result.userResponse).toBeDefined();
    });

    it('should throw error if user not found', async () => {
      // Arrange
      const loginDto = { email: 'nonexistent@example.com', password: 'Password123!' };
      (prisma.user.findUnique as any).mockResolvedValue(null);

      // Act & Assert
      await expect(AuthService.login(loginDto)).rejects.toThrow('Invalid email or password');
    });

    it('should throw error if password is invalid', async () => {
      // Arrange
      const loginDto = { email: 'user@example.com', password: 'WrongPassword123!' };
      const mockUser = { user_id: BigInt(1), email: 'user@example.com', password: 'hashedpass' };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);
      (comparePassword as any).mockResolvedValue(false);

      // Act & Assert
      await expect(AuthService.login(loginDto)).rejects.toThrow('Invalid email or password');
    });
  });

  describe('verifyEmail', () => {
    it('should successfully verify email with valid code', async () => {
      // Arrange
      const userId = 1;
      const code = '123456';
      const mockUser = {
        user_id: BigInt(1),
        email: 'user@example.com',
        verification_code: '123456',
        email_verified: false
      };
      const updatedUser = { ...mockUser, email_verified: true };

      (prisma.user.findFirst as any).mockResolvedValue(mockUser);
      (prisma.user.update as any).mockResolvedValue(updatedUser);

      // Act
      const result = await AuthService.verifyEmail(userId, code);

      // Assert
      expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { user_id: userId } });
      expect(prisma.user.update).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should throw error if user not found', async () => {
      // Arrange
      (prisma.user.findFirst as any).mockResolvedValue(null);

      // Act & Assert
      await expect(AuthService.verifyEmail(999, '123456')).rejects.toThrow('User not found');
    });

    it('should throw error if user already verified', async () => {
      // Arrange
      const mockUser = {
        user_id: BigInt(1),
        email: 'user@example.com',
        email_verified: true
      };

      (prisma.user.findFirst as any).mockResolvedValue(mockUser);

      // Act & Assert
      await expect(AuthService.verifyEmail(1, '123456')).rejects.toThrow('User already verified');
    });

    it('should throw error if verification code is invalid', async () => {
      // Arrange
      const mockUser = {
        user_id: BigInt(1),
        email: 'user@example.com',
        verification_code: '123456',
        email_verified: false
      };

      (prisma.user.findFirst as any).mockResolvedValue(mockUser);

      // Act & Assert
      await expect(AuthService.verifyEmail(1, 'wrongcode')).rejects.toThrow('Invalid verification code');
    });
  });
});
