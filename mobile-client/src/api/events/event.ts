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
