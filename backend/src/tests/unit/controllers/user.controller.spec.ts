/**
 * Unit tests for UserController.getUserById
 * - Mocks the `user.service` module to avoid DB calls.
 * - Uses a small `makeResponse` helper to capture HTTP responses.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the user.service module imported by the controller
vi.mock('../../../services/user.service.js', () => ({
  default: {
    getUserById: vi.fn()
  }
}));

import userService from '../../../services/user.service.js';
import UserController from '../../../controllers/user.controller.js';
import { makeResponse } from '../../test-utils.js';
import type { Request } from 'express';

describe('UserController.getUserById', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns BadRequest for invalid id (Arrange / Act / Assert)', async () => {
    const req: any = { params: { id: '' } } as unknown as Request;
    const res = makeResponse();

    await UserController.getUserById(req, res);

    expect(res._status).toBe(400);
    expect(res._json.message).toMatch(/Invalid Id/i);
  });

  it('returns NotFound when user not found', async () => {
    // Arrange
    const mockedUserService = vi.mocked(userService);
    mockedUserService.getUserById.mockResolvedValue(null);
    const req: any = { params: { id: '123' } } as unknown as Request;
    const res = makeResponse();

    // Act
    await UserController.getUserById(req, res);

    // Assert
    expect(res._status).toBe(404);
    expect(res._json.message).toBe('User not found');
  });

  it('returns Ok when user found', async () => {
    const mockUser = { user_id: '1', email: 'a@e.com', nickname: 'nick' };
    (userService.getUserById as any).mockResolvedValue(mockUser);
    const req: any = { params: { id: '1' } } as unknown as Request;
    const res = makeResponse();

    await UserController.getUserById(req, res);

    expect(res._status).toBe(200);
    expect(res._json.data).toBeDefined();
    expect(res._json.message).toBe('User found');
  });

  it('returns InternalServerError when service throws', async () => {
    const mockedUserService = vi.mocked(userService);
    mockedUserService.getUserById.mockRejectedValue(new Error('DB down'));

    const req = { params: { id: '1' } } as unknown as Request;
    const res = makeResponse();

    await UserController.getUserById(req, res);

    expect(res._status).toBe(500);
    expect(res._json.message).toMatch(/error/i);
  });
});
