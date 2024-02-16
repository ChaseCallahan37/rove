import { Text, View } from "react-native";
import { AppNavigationProp } from "../AppNavigations";
import { Event, retrieveEvent } from "../../api/events/event";
import useApi from "../../hooks/useApi";
import { useEffect } from "react";

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

  const {loading, error, data: event, request: getEvent} = useApi(retrieveEvent)

  useEffect(() => {
    getEvent(eventID)
  }, [])


  return (
    <View>
      {loading ? <Text style={{color: "red"}}>Loading</Text> : error ? <Text style={{color: "red"}}>Error</Text> : 
      <Text style={{ color: "blue" }}>This is new event!{JSON.stringify(event)}</Text>}
    </View>
  );
}

export default EventDetailsScreen;
