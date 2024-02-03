

const url = `http://192.168.12.131:4000/api/`;

async function get(resource: string) {

  return fetch(url + resource) as Promise<Response>;
}

export default {
  get,
};
