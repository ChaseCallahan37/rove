import service from "../service";

export type Event = {
  title: string;
  date: Date;
  latitude: number;
  longitude: number;
};

const resourceName = "events";

export async function retrieveEvents() {
  const res = await service.get(resourceName);

  return res;
}

export async function createEvent(event: Event) {
  const res = await service.post<Event>(resourceName, event);

  return res;
}
