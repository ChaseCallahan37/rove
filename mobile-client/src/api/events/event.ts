import service from "../service"

export type Event = {
    coordinate: {
        latitude: number,
        longitude: number
    }
}

const resourceName = "events"

export function retrieveEvents(){
   return service.get<Event[]>(resourceName) 
}