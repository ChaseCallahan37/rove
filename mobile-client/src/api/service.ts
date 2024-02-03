import Config from "react-native-config";

const url = Config.WEB_API_URL;

async function get(resource: string) {
  return fetch(url + resource) as Promise<Response>;
}

export default {
  get,
};
