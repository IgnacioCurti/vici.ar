import prisma from '../config/prisma';
import type { Users } from '../../prisma/generated/client';
import type { RegisterDto } from '../models/dto/auth.dto';
';

export class AuthService {

  async register(dto: RegisterDto): Promise<{ token: string; user: Users }> {

    const existingUser = await prisma.users.findUnique({
      where: { email: dto.email }
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    if (dto.password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    const hashedPassword = 'hashedpassword' //implementar hash

    const user = await prisma.users.create({
      data: {
        email: dto.email,
        username: dto.username,
        password: hashedPassword,
      },
    });

    return { token, user };
  }

}

export default new AuthService();
