import type { User } from "../../../prisma/generated/client.js";

export type UserResponseDto = {
  userId: number;
  email: string;
  username: string;
  displayname: string | null;
  description: string | null;
  emailVerified: boolean;
  createdAt: Date;
};

export const toUserResponse = (user: User): UserResponseDto => ({
  userId: Number(user.user_id),
  email: user.email,
  username: user.username,
  displayname: user.displayname,
  description: user.description,
  emailVerified: user.email_verified,
  createdAt: user.created_at,
});
