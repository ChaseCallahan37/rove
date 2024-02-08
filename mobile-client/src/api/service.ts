import Config from "react-native-config";

const url = Config.WEB_API_URL;

async function get(resource: string) {
  return fetch(url + resource) as Promise<Response>;
}

async function post<T>(resource: string, payload: T) {
  console.log("HERE IS POST");
  console.log(payload);

  return fetch(url + resource, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export default {
  get,
  post,
};
