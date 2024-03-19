
import { useEffect, useState } from 'react';


async function requestLocationPermission() {
 
}

async function getLocation(){
 
}

export default function useLocation(){
    const [location, setLocation] = useState<undefined|{longitude: number, latitude: number}>()

    useEffect(() => {
        getLocation()
    })

}