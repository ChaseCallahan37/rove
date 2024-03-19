
import { useEffect, useState } from 'react';

import Geolocation from '@react-native-community/geolocation';


async function requestLocationPermission() {
 
}

async function getLocation(){
 
}

export default function useLocation(){
    const [location, setLocation] = useState<undefined|{longitude: number, latitude: number}>()


//@ts-ignore
Geolocation.getCurrentPosition((info) => console.log(info), (er) => console.log(er), {});
    useEffect(() => {
        getLocation()
    })

}