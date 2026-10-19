import { describe, expect, it } from 'vitest';
import type { User } from '../../../../prisma/generated/client.js';
import { toUserResponse } from '../../../models/dto/user.dto.js';

describe('toUserResponse', () => {
  it('maps the complete user response contract, including nullable profile fields', () => {
    const createdAt = new Date('2026-01-02T03:04:05.000Z');
    const user = {
      user_id: 42n,
      email: 'player@example.com',
      username: 'player',
      displayname: null,
      description: null,
      email_verified: true,
      created_at: createdAt,
      password: 'hashed-password',
      verification_code: '123456',
    } as User;

    expect(toUserResponse(user)).toEqual({
      userId: 42,
      email: 'player@example.com',
      username: 'player',
      displayname: null,
      description: null,
      emailVerified: true,
      createdAt,
    });
  });
});
