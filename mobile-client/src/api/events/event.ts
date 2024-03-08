import createAuthHeader from "../../utils/createAuthHeader";
import service, { unpackResponse } from "../service";
import { User } from "../user/user";

export type Event = {
  id: string;
  title: string;
  date: Date;
  latitude: number;
  longitude: number;
  owner?: User;
  attendees?: User[]
};

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
  const res = await service.post<{ event: Event }>(
    resourceName,
    {
      event: newEvent,
    },
    createAuthHeader(token)
  );

  const { data: createdEvent } = await unpackResponse<{ data: Event }>(res);

  return createdEvent;
}


export async function joinEvent(token: string, eventId: string) {

}

