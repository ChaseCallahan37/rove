import Config from "react-native-config";

const url = Config.WEB_API_URL;

async function get(resource: string) {
  const res = fetch(url + resource);

  return res;
}

async function getOne(resource: string, id: string){
  const payload = {
    id
  }
  
  const res = fetch(url + resource, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  })

  return res
}

async function post<T>(resource: string, payload: T) {
  const res = fetch(url + resource, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res;
}

export default {
  get,
  getOne,
  post
};
