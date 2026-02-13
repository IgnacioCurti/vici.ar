import type { Events, User, EventsUsers } from "../../../prisma/generated/client.js";

export type EventResponseDto = {
  event_id: number;
  start_time: Date;
  end_time: Date;
  description: string;
  game_id: string;
  host_id: number;
  schedule_at: Date;
  host?: User | undefined;
  eventParticipants?: EventsUsers[] | undefined;
};

export const toEventResponse = (event: Events & { host?: User; eventParticipants?: EventsUsers[] }): EventResponseDto => ({
  event_id: Number(event.event_id),
  start_time: event.start_time,
  end_time: event.end_time,
  description: event.description,
  game_id: event.game_id,
  host_id: Number(event.host_id),
  schedule_at: event.schedule_at,
  host: event.host,
  eventParticipants: event.eventParticipants,
});