import type { Events } from '../../prisma/generated/client.js';
import prisma from '../config/prisma.js';

export class EventService {
  async getEventById(eventId: string): Promise<Events | null> {
    return await prisma.events.findUnique({
      where: { event_id: BigInt(eventId) }
    });
  }
}

export default new EventService();