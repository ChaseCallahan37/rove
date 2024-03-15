import { retrieveToken } from "../../auth/token";
import createAuthHeader from "../../utils/createAuthHeader";
import { parseEvent } from "../events/event";
import service, { unpackResponse } from "../service";

export type User = {
  id: string;
  user_name: string;
  first_name?: string;
  last_name?: string;
  dob?: Date;
  gender?: string;
};

export function parseUser(obj: any): User {
  return { ...obj, dob: new Date(obj.dob) };
}

const resourceName = "users";

export async function updateUserProfile(updatedFields: {
  first_name: string;
  last_name: string;
  dob: Date;
  gender: string;
}) {
  const token = await retrieveToken();

  const res = await service.put(`${resourceName}/update`, {
    headers: createAuthHeader(token),
    payload: {
      user: updatedFields,
    },
  });

  const { data: user } = await unpackResponse<{ data: User }>(res);

  return parseUser(user);
}

export async function retrieveUserEvents() {
  const token = await retrieveToken();
  const res = await service.get(`${resourceName}/current/events`, {
    headers: createAuthHeader(token),
  });

  const {
    data: { attendances, events_created },
  } = await unpackResponse<{
    data: { events_created: Event[]; attendances: Event[] };
  }>(res);

  return {
    attendances: attendances.map(parseEvent),
    events_created: events_created.map(parseEvent),
  };
}
