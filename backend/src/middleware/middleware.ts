import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../utils/http.response.js';

const httpResponse = new HttpResponse();

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined in .env");
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export interface JwtPayload {
  userId: number;
  email: string;
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET_KEY);
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch (error) {
    return null;
  }
};

export function auth(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      httpResponse.Unauthorized(res, "Token not provided. Format: Bearer <token>");
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      httpResponse.Unauthorized(res, "Token not provided");
      return;
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      httpResponse.Unauthorized(res, "Invalid token");
      return;
    }

    next();

  } catch (error) {
    httpResponse.Unauthorized(res, "Authentication error");
  }
}
