import type { Request, Response } from 'express';
import authService from '../services/auth.service.js';
import { HttpResponse } from '../utils/http.response.js';
import { toUserResponse } from '../models/dto/user.dto.js';

export class AuthController {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) { }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { email, username, password } = req.body;

      if (!email || !username || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const passwordPattern: RegExp = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$"
      );
      if (!passwordPattern.test(req.body.password)) {
        return res
          .status(400)
          .json({ message: "Password doesn't match the requirements." });
      }

      const { token, user } = await authService.register({
        email,
        username,
        password,
      });

      return res.status(201).json({ message: "User created", token, user: toUserResponse(user), });

    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error registering user';
      return this.httpResponse.Error(res, message);
    }
  }
}

export default new AuthController();
