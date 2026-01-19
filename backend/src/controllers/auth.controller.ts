
import type { Request, Response } from 'express';

export class AuthController {
  /**
   * POST /auth/register
   * Registrar nuevo usuario
   */

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, password } = req.body;

      if (!email || !name || !password) {
        res.status(400).json('All fields are required');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json('Invalid email format');
      }

      const { token, user } = await authService.register({
        email,
        name,
        password,
      });

      res.status(200).json('User registration successfully')

    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error registering user';
      res.status(400).json(message)
    }
  }
}

export default new AuthController();
