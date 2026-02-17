import type { Request, Response } from 'express';
import { HttpResponse } from "../utils/http.response.js";
import eventService from '../services/event.service.js';
import { toEventResponse } from '../models/dto/event.dto.js';
import type { Events } from '../../prisma/generated/client.js';

export class EventController {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) { }

  async getEventById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (typeof id !== 'string' || !id) {
        return this.httpResponse.BadRequest(res, "Invalid Id");
      }

      const event: Events | null = await eventService.getEventById(id);

      if (!event) {
        return this.httpResponse.NotFound(res, "Event not found");
      }

      return this.httpResponse.Ok(res, "Event found", toEventResponse(event));

    } catch (error) {
      return this.httpResponse.Error(res);
    }
  }
}

export default new EventController();