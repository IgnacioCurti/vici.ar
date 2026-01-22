import prisma from '../config/prisma.js';
import type { LoginDto, RegisterDto } from '../models/dto/auth.dto.js';
import { comparePassword, hashPassword } from '../utils/bcrypt.js';
import { generateToken } from '../middleware/middleware.js';
import type { User } from '../../prisma/generated/client.js';
import emailService from './email.service.js';

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

    await emailService.sendVerificationEmail(user.email, verification_code);

    const token = generateToken({
      userId: Number(user.user_id),
      email: user.email
    });

    return { token, user };
  }

  async verifyEmail(code: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {verification_code: code}
    });

    if (!user) {
      throw new Error("Invalid verification code");
    }

    const updateUser = await prisma.user.update({
      where: {user_id: user.user_id},
      data: {
        email_verified: true
      }
    });

    return updateUser;
  }

  async login(dto: LoginDto): Promise<{ token: string; user: User }> {

    const user = await prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await comparePassword(dto.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password')
    }

    const token = generateToken({
      userId: Number(user.user_id),
      email: user.email,
    })

    return { token, user }

  }

}

export default new AuthService();
