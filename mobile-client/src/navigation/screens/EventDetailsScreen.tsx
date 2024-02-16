import { Text, View } from "react-native";
import { AppNavigationProp } from "../AppNavigations";
import { Event, retrieveEvent } from "../../api/events/event";
import useApi from "../../hooks/useApi";
import { useEffect } from "react";


import {style as tw} from "twrnc"
import format from "../../utils/format";

export type EventDetailsScreenParams = {
  eventID: string;
};

export type EventDetailsScreenProps = {
  navigation: AppNavigationProp<"EventDetails">;
  route: {
    params: EventDetailsScreenParams;
  };
};

function EventDetailsScreen({
  navigation,
  route: { params: {eventID}},
}: EventDetailsScreenProps) {

  const {loading, error, data, request: getEvent} = useApi(retrieveEvent)
  const event = data as Event | undefined | null
  useEffect(() => {
    getEvent(eventID)
  }, [])

console.log(event);


  return (
    <View style={tw(['flex-1', 'bg-slate-100'])}>
      {loading ? <Text style={{color: "red"}}>Loading</Text> : error ? <Text style={{color: "red"}}>Error</Text> :
      event && 
      <View style={tw(['grow', 'px-2'])}>
        <Text style={{ color: "blue" }}>This is new event!{JSON.stringify(event)}</Text>
        <View style={tw(['bg-sky-200', 'rounded-full', 'p-2', 'flex', 'items-center'])}>
          <Text style={tw(['text-black', 'text-lg'])}>{event.title}</Text>
          {// @ts-ignore
          
          <Text style={tw(['text-black'])}>{event.date}</Text>
}
        </View>
      </View>
      
      
      
      }
    </View>
  );
}

export default EventDetailsScreen;
