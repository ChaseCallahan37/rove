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

async function getIpAddress() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return `http://${data.ip}:4000/api/`;
  } catch (error) {
    console.error('Failed to fetch IP address:', error);
  }
}
async function get<T>(resource: string) {
  console.log(`Running request for data!!! ${resource}`);
  const url = `http://192.168.12.131:4000/api/`
  console.log(`Hers my ip address ${url}`);
   
  return fetch(url + resource);

}

export default {
  get,
};
