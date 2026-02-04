/**
 * Unit tests for AuthController
 * - Mocks auth.service to avoid DB/email calls.
 * - Uses makeResponse helper to capture HTTP responses.
 * - Tests input validation, error handling, and success paths.
 * - Uses Arrange / Act / Assert pattern.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock auth.service
vi.mock('../../../services/auth.service.js', () => ({
  default: {
    register: vi.fn(),
    login: vi.fn(),
    verifyEmail: vi.fn()
  }
}));

import authService from '../../../services/auth.service.js';
import AuthController from '../../../controllers/auth.controller.js';
import { makeResponse } from '../../test-utils.js';
import type { Request } from 'express';

describe('AuthController', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('register', () => {
    it('should register user with valid data (Arrange / Act / Assert)', async () => {
      // Arrange
      const req: any = {
        body: {
          email: 'newuser@example.com',
          username: 'newuser',
          password: 'SecurePass123!'
        }
      } as Request;
      const res = makeResponse();
      const mockResponse = { token: 'jwt.token', userResponse: { email: 'newuser@example.com' } };
      (authService.register as any).mockResolvedValue(mockResponse);

      // Act
      await AuthController.register(req, res);

      // Assert
      expect(res._status).toBe(201);
      expect(res._json.message).toBe('User created');
      expect(res._json.token).toBe('jwt.token');
      expect(authService.register).toHaveBeenCalledWith({
        email: 'newuser@example.com',
        username: 'newuser',
        password: 'SecurePass123!'
      });
    });

    it('should return 400 if required fields are missing', async () => {
      // Arrange
      const req: any = { body: { email: 'test@example.com' } } as Request;
      const res = makeResponse();

      // Act
      await AuthController.register(req, res);

      // Assert
      expect(res._status).toBe(400);
      expect(res._json.message).toBe('All fields are required');
    });

    it('should return 400 for invalid email format', async () => {
      // Arrange
      const req: any = {
        body: {
          email: 'invalid-email',
          username: 'user',
          password: 'SecurePass123!'
        }
      } as Request;
      const res = makeResponse();

      // Act
      await AuthController.register(req, res);

      // Assert
      expect(res._status).toBe(400);
      expect(res._json.message).toBe('Invalid email format');
    });

    it('should return 400 for weak password', async () => {
      // Arrange
      const req: any = {
        body: {
          email: 'test@example.com',
          username: 'user',
          password: 'weak'  // Does not meet requirements
        }
      } as Request;
      const res = makeResponse();

      // Act
      await AuthController.register(req, res);

      // Assert
      expect(res._status).toBe(400);
      expect(res._json.message).toMatch(/Password doesn't match the requirements/i);
    });

    it('should return 500 if service throws error', async () => {
      // Arrange
      const req: any = {
        body: {
          email: 'existing@example.com',
          username: 'user',
          password: 'SecurePass123!'
        }
      } as Request;
      const res = makeResponse();
      (authService.register as any).mockRejectedValue(new Error('Email already registered'));

      // Act
      await AuthController.register(req, res);

      // Assert
      expect(res._status).toBe(500);
      expect(res._json.message).toBe('Email already registered');
    });
  });

  describe('login', () => {
    it('should login user with valid credentials', async () => {
      // Arrange
      const req: any = {
        body: { email: 'user@example.com', password: 'SecurePass123!' }
      } as Request;
      const res = makeResponse();
      const mockResponse = { token: 'jwt.token.login', userResponse: { email: 'user@example.com' } };
      (authService.login as any).mockResolvedValue(mockResponse);

      // Act
      await AuthController.login(req, res);

      // Assert
      expect(res._status).toBe(200);
      expect(res._json.message).toBe('User logged in');
      expect(res._json.token).toBe('jwt.token.login');
      expect(authService.login).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'SecurePass123!'
      });
    });

    it('should return 400 if email or password missing', async () => {
      // Arrange
      const req: any = { body: { email: 'test@example.com' } } as Request;
      const res = makeResponse();

      // Act
      await AuthController.login(req, res);

      // Assert
      expect(res._status).toBe(400);
      expect(res._json.message).toBe('All fields are required');
    });

    it('should return 400 for invalid email format in login', async () => {
      // Arrange
      const req: any = {
        body: { email: 'not-an-email', password: 'SecurePass123!' }
      } as Request;
      const res = makeResponse();

      // Act
      await AuthController.login(req, res);

      // Assert
      expect(res._status).toBe(400);
      expect(res._json.message).toBe('Invalid email format');
    });

    it('should return 500 if service throws error (invalid credentials)', async () => {
      // Arrange
      const req: any = {
        body: { email: 'user@example.com', password: 'WrongPassword' }
      } as Request;
      const res = makeResponse();
      (authService.login as any).mockRejectedValue(new Error('Invalid email or password'));

      // Act
      await AuthController.login(req, res);

      // Assert
      expect(res._status).toBe(500);
      expect(res._json.message).toBe('Invalid email or password');
    });
  });

  describe('verifyEmail', () => {
    it('should verify email with valid id and code', async () => {
      // Arrange
      const req: any = { params: { id: '1', code: '123456' } } as unknown as Request;
      const res = makeResponse();
      const mockUser = { email: 'user@example.com', email_verified: true };
      (authService.verifyEmail as any).mockResolvedValue(mockUser);

      // Act
      await AuthController.verifyEmail(req, res);

      // Assert
      expect(res._status).toBe(200);
      expect(res._json.message).toBe('Email verified successfully');
      expect(authService.verifyEmail).toHaveBeenCalledWith(1, '123456');
    });

    it('should return 400 if id or code is not string', async () => {
      // Arrange
      const req: any = { params: { id: 123, code: '123456' } } as unknown as Request;
      const res = makeResponse();

      // Act
      await AuthController.verifyEmail(req, res);

      // Assert
      expect(res._status).toBe(400);
      expect(res._json.message).toBe('Invalid id or code');
    });

    it('should return 400 if id is not a valid number', async () => {
      // Arrange
      const req: any = { params: { id: 'not-a-number', code: '123456' } } as unknown as Request;
      const res = makeResponse();

      // Act
      await AuthController.verifyEmail(req, res);

      // Assert
      expect(res._status).toBe(400);
      expect(res._json.message).toBe('Invalid user id');
    });

    it('should return 400 if service throws error (invalid code)', async () => {
      // Arrange
      const req: any = { params: { id: '1', code: 'wrongcode' } } as unknown as Request;
      const res = makeResponse();
      (authService.verifyEmail as any).mockRejectedValue(new Error('Invalid verification code'));

      // Act
      await AuthController.verifyEmail(req, res);

      // Assert
      expect(res._status).toBe(400);
      expect(res._json.message).toBe('Invalid verification code');
    });

    it('should return 400 if user already verified', async () => {
      // Arrange
      const req: any = { params: { id: '1', code: '123456' } } as unknown as Request;
      const res = makeResponse();
      (authService.verifyEmail as any).mockRejectedValue(new Error('User already verified'));

      // Act
      await AuthController.verifyEmail(req, res);

      // Assert
      expect(res._status).toBe(400);
      expect(res._json.message).toBe('User already verified');
    });
  });
});
