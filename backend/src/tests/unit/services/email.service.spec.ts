/**
 * Unit tests for EmailService
 * - Nodemailer transporter is mocked to avoid real SMTP calls.
 * - Tests email construction and delivery.
 * - Uses Arrange / Act / Assert pattern.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock nodemailer usando factory function
vi.mock('nodemailer', () => {
  const mockSendMail = vi.fn();
  const mockCreateTransport = vi.fn(() => ({
    sendMail: mockSendMail
  }));

  return {
    default: {
      createTransport: mockCreateTransport,
      // Exportar para poder acceder desde los tests
      __mockSendMail: mockSendMail,
      __mockCreateTransport: mockCreateTransport
    }
  };
});

import nodemailer from 'nodemailer';
import EmailService from '../../../services/email.service.js';

describe('EmailService', () => {
  // Acceder a los mocks
  const mockSendMail = (nodemailer as any).__mockSendMail;
  const mockCreateTransport = (nodemailer as any).__mockCreateTransport;

  beforeEach(() => {
    // Setup env vars
    process.env.SMTP_HOST = 'smtp.example.com';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_USER = 'test@example.com';
    process.env.SMTP_PASS = 'password';
    process.env.FRONTEND_URL = 'http://localhost:3000';

    // Clear mocks
    vi.clearAllMocks();
  });

  describe('sendVerificationEmail', () => {
    it('should send verification email with correct parameters (Arrange / Act / Assert)', async () => {
      // Arrange
      mockSendMail.mockResolvedValue({ messageId: '123' });

      const email = 'user@example.com';
      const userId = 42;
      const code = '123456';

      // Act
      await EmailService.sendVerificationEmail(email, userId, code);

      // Assert
      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: expect.stringContaining('test@example.com'),
          to: 'user@example.com',
          subject: 'Email verification',
          html: expect.stringContaining('123456')
        })
      );
    });

    it('should construct verification URL with userId and code', async () => {
      // Arrange
      mockSendMail.mockResolvedValue({ messageId: '123' });

      const email = 'test@example.com';
      const userId = 99;
      const code = 'ABC789';

      // Act
      await EmailService.sendVerificationEmail(email, userId, code);

      // Assert
      const callArgs = mockSendMail.mock.calls[0][0];
      expect(callArgs.html).toContain('userId=99');
      expect(callArgs.html).toContain('code=ABC789');
      expect(callArgs.html).toContain('http://localhost:3000/verify-email');
    });

    it('should handle email sending errors gracefully', async () => {
      // Arrange
      mockSendMail.mockRejectedValue(new Error('SMTP connection failed'));

      // Act & Assert
      await expect(
        EmailService.sendVerificationEmail('user@example.com', 1, '123456')
      ).rejects.toThrow('SMTP connection failed');
    });
  });
});
