import type { User } from '../../prisma/generated/client.js';
import prisma from '../config/prisma.js';

export class UserService {
  async getUserById(userId: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { user_id: BigInt(userId) }
    });
  }
}

export default new UserService();
