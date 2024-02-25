import Config from "react-native-config";

export type RequestResponse<T> = T | { error: string } | undefined;

const url = Config.WEB_API_URL;

async function get(resource: string, headers?: any) {
  const res = fetch(url + resource, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  return res;
}

async function post<T>(resource: string, payload: T, headers?: any) {
  const res = fetch(url + resource, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(payload),
  });

  return res;
}

export async function unpackResponse<T extends object>(res: Response) {
  const json = (await res.json()) as RequestResponse<T>;

  if (!json) throw new Error("Error with request");

  // @ts-ignore
  if (json.error) throw new Error(json.error);

  return json as T;
}

export default {
  get,
  post,
};
