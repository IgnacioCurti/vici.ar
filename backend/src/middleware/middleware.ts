import jwt from 'jsonwebtoken';

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
