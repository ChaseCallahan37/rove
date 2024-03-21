import { useEffect, useState } from "react";

import Geolocation from "@react-native-community/geolocation";

async function requestLocationPermission() {}

async function getLocation() {}

export default function useLocation() {
  const [location, setLocation] = useState<
    undefined | { longitude: number; latitude: number }
  >();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({
        coords: { latitude, longitude },
      }: {
        coords: { latitude: number; longitude: number };
      }) => {
        setLocation({ latitude, longitude });
      },
      (er: any) => console.log(er),
      {}
    );
  });

  return { location };
}
