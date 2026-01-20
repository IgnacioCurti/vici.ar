import prisma from '../config/prisma.js';
import type { RegisterDto } from '../models/dto/auth.dto.js';
import { hashPassword } from '../utils/bcrypt.js';
import { generateToken } from '../middleware/middleware.js';
import type { User } from '../../prisma/generated/client.js';

export class AuthService {

  async register(dto: RegisterDto): Promise<{ token: string; user: User }> {

    const existingUser = await prisma.user.findUnique({
      where: { email: dto.email }
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await hashPassword(dto.password);

    const verification_code = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        password: hashedPassword,
        verification_code: verification_code
      },
    });

    const token = generateToken({
      userId: Number(user.user_id),
      email: user.email
    });

    return { token, user };
  }

}

export default new AuthService();
