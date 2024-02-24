import Config from "react-native-config";

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

export default {
  get,
  post,
};
