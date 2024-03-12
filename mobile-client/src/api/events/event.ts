import createAuthHeader from "../../utils/createAuthHeader";
import service, { unpackResponse } from "../service";
import { User, parseUser } from "../user/user";

export type Event = {
  id: string;
  title: string;
  date: Date;
  latitude: number;
  longitude: number;
  owner?: User;
  attendees?: User[];
};

export function parseEvent(obj: any): Event {
  return {
    ...obj,
    date: new Date(obj.date),
    latitude: parseFloat(obj.latitude),
    longitude: parseFloat(obj.longitude),
    owner: obj.owner ? parseUser(obj.owner) : null,
  };
}

const resourceName = "events";

export async function retrieveEvents() {
  const res = await service.get(resourceName);

  const { data: events } = await unpackResponse<{ data: Event[] }>(res);

  return events;
}

export async function retrieveEvent(id: string) {
  const res = await service.get(resourceName + "/" + id);

  const { data: event } = await unpackResponse<{ data: Event }>(res);

  return event;
}

export async function createEvent(token: string, newEvent: Event) {
  const res = await service.post<{ event: Event }>(resourceName, {
    payload: {
      event: newEvent,
    },
    headers: createAuthHeader(token),
  });

  const { data: createdEvent } = await unpackResponse<{ data: Event }>(res);

  return createdEvent;
}

export async function updateEvent(token: string, eventToUpdate: Event){
  const res = await service.put<{event: Event}>(`${resourceName}`, {headers: createAuthHeader(token), payload: {event: eventToUpdate}})

  const {data: updatedEvent} = await unpackResponse<{data: Event}>(res)
  
  return updatedEvent
}

export async function joinEvent(token: string, eventId: string) {
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
