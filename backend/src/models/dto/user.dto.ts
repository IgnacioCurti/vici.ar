import type { Users } from "../../../prisma/generated/client";

export type UserResponseDto = Omit<Users, 'password'>

export const toUserResponse = (user: Users): UserResponseDto => {
  const {password, ...userWithoutPassword} = user;
  return userWithoutPassword
}