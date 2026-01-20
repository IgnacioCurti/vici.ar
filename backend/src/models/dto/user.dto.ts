import type { User } from "../../../prisma/generated/client";

export type UserResponseDto = {
  userId: number;
  email: string;
  username: string;
  displayname?: string | null;
  createdAt: Date;
};

export const toUserResponse = (user: User): UserResponseDto => ({
  userId: Number(user.user_id),
  email: user.email,
  username: user.username,
  displayname: user.displayname,
  createdAt: user.created_at,
});