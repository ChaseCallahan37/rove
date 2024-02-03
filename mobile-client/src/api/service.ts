const data = {
  events: [
    {
      coordinate: { latitude: 33.2098, longitude: -87.5692 },
      title: "Event1",
      date: new Date(),
    },
    {
      coordinate: { latitude: 33.2325, longitude: -87.5211 },
      title: "Event2",
      date: new Date(),
    },
    {
      coordinate: { latitude: 33.2341, longitude: -87.5331 },
      title: "Event3",
      date: new Date(),
    },
    {
      coordinate: { latitude: 33.2433, longitude: -87.5909 },
      title: "Event4",
      date: new Date(),
    },
  ],
};

const url = "http://localhost:4000/api/"

async function get<T>(resource: string) {
  console.log(`Running request for data!!! ${resource}`);
  
  return fetch(url + resource);

}

export default {
  get,
};
