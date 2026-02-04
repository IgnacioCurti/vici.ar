/**
 * Unit tests for UserService
 * - Prisma client is mocked to keep tests isolated and deterministic.
 * - Use Arrange / Act / Assert pattern.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the prisma module used by the service. Path matches import in service source.
vi.mock('../../../config/prisma.js', () => {
  return {
    default: {
      user: {
        findUnique: vi.fn()
      }
    }
  };
});

import prisma from '../../../config/prisma.js';
import UserService from '../../../services/user.service.js';

describe('UserService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('getUserById returns user when found (Arrange / Act / Assert)', async () => {
    // Arrange
    const mockUser = { user_id: BigInt(1), email: 'a@example.com', nickname: 'alice' };
    (prisma.user.findUnique as any).mockResolvedValue(mockUser);

    // Act
    const result = await UserService.getUserById('1');

    // Assert
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { user_id: BigInt('1') } });
    expect(result).toEqual(mockUser);
  });

  it('getUserById returns null when not found', async () => {
    // Arrange
    (prisma.user.findUnique as any).mockResolvedValue(null);

    // Act
    const result = await UserService.getUserById('999');

    // Assert
    expect(prisma.user.findUnique).toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
