import Config from "react-native-config";

export type RequestResponse<T> = T | { error: string } | undefined;

const url = Config.WEB_API_URL;

async function get(resource: string, headers?: any) {
  const getUrl = url + resource;
  const getInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  console.log(`GET ${getUrl}`);
  console.log(getInit);

  const res = fetch(getUrl, getInit);

  console.log(res);

  return res;
}

async function post<T>(
  resource: string,
  { headers, payload }: { payload?: T; headers?: any }
) {
  const postUrl = url + resource;
  const postInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(payload ? payload : {}),
  };
  console.log(`POST ${postUrl}`);
  console.log(postInit);

  const res = fetch(postUrl, postInit);

  console.log(res);

  return res;
}

async function put<T>(
  resource: string,
  { headers, payload }: { payload?: T; headers?: any }
) {
  const putUrl = url + resource;
  const putInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(payload ? payload : {}),
  };
  console.log(`PUT ${putUrl}`);
  console.log(putInit);

  const res = fetch(url + resource, putInit);

  console.log(res);

  return res;
}

export async function unpackResponse<T extends object>(res: Response) {
  const json = (await res.json()) as RequestResponse<T>;

  if (!json) throw new Error("Error with request");

  if ("error" in json) throw new Error(json.error);

  return json as T;
}

export default {
  get,
  post,
  put,
};
