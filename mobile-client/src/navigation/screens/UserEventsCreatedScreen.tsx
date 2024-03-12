import { Text, View } from "react-native";
import { style as tw } from "twrnc";

import useApi from "../../hooks/useApi";
import { useEffect, useRef } from "react";
import EventList from "../../components/EventList";
import { AppNavigationProp } from "../AppNavigations";
import useAuth from "../../hooks/useAuth";
import userApi from "../../api/user";

type UserEventsCreatedScreenProps = {
  navigation: AppNavigationProp<"UserEventsCreated">;
};

export default function UserEventsCreatedScreen({
  navigation,
}: UserEventsCreatedScreenProps) {
  const { account } = useAuth();
  const {
    data: events,
    request: userEventsRequest,
    loading,
  } = useApi(userApi.retrieveUserEvents, true);

  if (!account?.user) {
    return <Text style={tw(["text-black"])}>Loading...</Text>;
  }

  // @ts-ignore
  useEffect(() => {
    userEventsRequest();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: "blue" }}>USER CREATED EVENTS</Text>
      <View style={{ flex: 1 }}>
        <EventList
          events={events?.events_created}
          onEventSelect={({id}) => navigation.navigate("EventOwnerDetails", {eventId: id})}
        />
      </View>
    </View>
  );
}
