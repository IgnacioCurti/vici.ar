import prisma from '../config/prisma';
import type { Users } from '../../prisma/generated/client';
import type { RegisterDto } from '../models/dto/auth.dto';
import { hashPassword } from '../utils/bcrypt';
import { generateToken } from '../middlewares/middleware';

export class AuthService {

  async register(dto: RegisterDto): Promise<{ token: string; user: Users }> {

    const existingUser = await prisma.users.findUnique({
      where: { email: dto.email }
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await hashPassword(dto.password);

    const verification_code = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await prisma.users.create({
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
