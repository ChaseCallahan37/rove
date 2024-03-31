import { retrieveToken } from "../../auth/token";
import createAuthHeader from "../../utils/createAuthHeader";
import service, { unpackResponse } from "../service";
import { Tag, parseTag } from "../tags/tag";
import { User, parseUser } from "../user/user";

export type Event = {
  id: string;
  title: string;
  date: Date;
  location: {
    latitude: number,
    longitude: number
  }
  desciption?: string;
  owner?: User;
  attendees?: User[];
  tags?: Tag[];
};

export function parseEvent(obj: any): Event {
  return {
    ...obj,
    date: new Date(obj.date),
    location: {
      latitude: parseFloat(obj.latitude),
      longitude: parseFloat(obj.longitude),
    },
    owner: obj.owner ? parseUser(obj.owner) : null,
    tags: obj.tags ? obj.tags.map(parseTag) : null,
  };
}

const resourceName = "events";

export async function retrieveEvents(searchParams?: {start_date?: Date, end_date?: Date, location?: {latitude: number, longitude: number, radius: number}}) {
  const res = await service.post(resourceName + "/search", {
    payload: searchParams
  });

  const { data: events } = await unpackResponse<{ data: Event[] }>(res);

  return events;
}

export async function retrieveEvent(id: string) {
  const res = await service.get(resourceName + "/" + id);

  const { data: event } = await unpackResponse<{ data: Event }>(res);

  return event;
}

export async function createEvent(newEvent: {
  title?: string;
  date?: Date;
  location?: {latitude: number;
  longitude: number;}
  description?: string;
  tags?: string[];
}) {
  const token = await retrieveToken();

  const res = await service.post(resourceName + "/create", {
    payload: {
      event: newEvent,
    },
    headers: createAuthHeader(token),
  });

  const { data: createdEvent } = await unpackResponse<{ data: Event }>(res);

  return createdEvent;
}

export async function updateEvent(eventToUpdate: Event) {
  const token = await retrieveToken();

  const res = await service.put<{ event: Event }>(`${resourceName}`, {
    headers: createAuthHeader(token),
    payload: { event: eventToUpdate },
  });

  const { data: updatedEvent } = await unpackResponse<{ data: Event }>(res);

  return updatedEvent;
}

export async function joinEvent(eventId: string) {
  const token = await retrieveToken();

  await service.post(`${resourceName}/join`, {
    headers: createAuthHeader(token),
    payload: {
      event: {
        id: eventId,
      },
    },
  });

  return true;
}
