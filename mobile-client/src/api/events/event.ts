import service from "../service";

export type Event = {
  id: string,
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

export async function createEvent(newEvent: Event) {
  const res = await service.post<{ event: Event }>(resourceName, {
    event: newEvent,
  });

  return res;
}
