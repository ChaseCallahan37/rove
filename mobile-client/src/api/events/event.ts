import service from "../service";

export type Event = {
  title: string;
  date: Date;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

const resourceName = "events";

export function retrieveEvents() {
  console.log(`Who super cool ${resourceName}`);
  
  return service.get<Event[]>(resourceName);
}
