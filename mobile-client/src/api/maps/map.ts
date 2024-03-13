import createAuthHeader from "../../utils/createAuthHeader";
import service, { unpackResponse } from "../service";
import { User, parseUser } from "../user/user";

export type Place = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  icon: {url: string, bg_color: string};
};

export function parsePlace(obj: any): Place {
  return {
    ...obj,
    latitude: parseFloat(obj.latitude),
    longitude: parseFloat(obj.longitude),
  };
}

const resourceName = "map";

export async function searchPlaces(searchBody: {query: string}) {
  const res = await service.post(`${resourceName}/places/search`, {
    payload: {
      search: searchBody,
    },
  });

  const {data: places} = await unpackResponse<{data: Place[]}>(res)

  return places.map(parsePlace)
}