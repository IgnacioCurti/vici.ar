import type { Request, Response } from 'express';
import { HttpResponse } from "../utils/http.response.js";
import userService from '../services/user.service.js';
import { toUserResponse } from '../models/dto/user.dto.js';
import type { User } from '../../prisma/generated/client.js';

export class UserController {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) { }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (typeof id !== 'string' || !id) {
        return this.httpResponse.BadRequest(res, "Invalid Id");
      }

      const user: User | null = await userService.getUserById(id);

      if (!user) {
        return this.httpResponse.NotFound(res, "User not found");
      }

      return this.httpResponse.Ok(res, "User found", toUserResponse(user));

    } catch (error) {
      return this.httpResponse.Error(res);
    }
  }
}

export default new UserController();
