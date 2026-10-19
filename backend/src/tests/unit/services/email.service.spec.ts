import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockSend } = vi.hoisted(() => ({
  mockSend: vi.fn(),
}));

vi.mock('googleapis', () => ({
  google: {
    auth: {
      OAuth2: vi.fn(() => ({
        setCredentials: vi.fn(),
      })),
    },
    gmail: vi.fn(() => ({
      users: {
        messages: {
          send: mockSend,
        },
      },
    })),
  },
}));

import EmailService from '../../../services/email.service.js';

describe('EmailService', () => {
  beforeEach(() => {
    process.env.GMAIL_USER = 'test@example.com';
    process.env.FRONTEND_URL = 'http://localhost:3000';
    vi.clearAllMocks();
  });

  describe('sendVerificationEmail', () => {
    it('sends the verification email through the Gmail API', async () => {
      mockSend.mockResolvedValue({ data: { id: 'message-123' } });

      await EmailService.sendVerificationEmail('recipient@example.com', 42, '123456');

      expect(mockSend).toHaveBeenCalledOnce();
      expect(mockSend).toHaveBeenCalledWith({
        userId: 'me',
        requestBody: { raw: expect.any(String) },
      });

      const encodedMessage = mockSend.mock.calls[0][0].requestBody.raw;
      const message = Buffer.from(encodedMessage, 'base64url').toString('utf8');
      expect(message).toContain('From: "VICI.AR" <test@example.com>');
      expect(message).toContain('To: recipient@example.com');
      expect(message).toContain('Subject: Email Verification - VICI.AR');
      expect(message).toContain('userId=42');
      expect(message).toContain('code=123456');
      expect(message).toContain('http://localhost:3000/verify-email');
    });

    it('propagates Gmail API errors', async () => {
      mockSend.mockRejectedValue(new Error('Gmail API unavailable'));

      await expect(
        EmailService.sendVerificationEmail('recipient@example.com', 1, '123456'),
      ).rejects.toThrow('Gmail API unavailable');
    });
  });
});
