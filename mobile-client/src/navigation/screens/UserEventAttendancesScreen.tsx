import { Text, View } from "react-native";
import { style as tw } from "twrnc";

import useApi from "../../hooks/useApi";
import { useEffect, useRef } from "react";
import eventApi from "../../api/events";
import AppMapView from "../../components/AppMapView";
import EventList from "../../components/EventList";
import { AppNavigationProp } from "../AppNavigations";
import useAuth from "../../hooks/useAuth";
import userApi from "../../api/user";

type UserEventAttendancesScreenProps = {
  navigation: AppNavigationProp<"UserEventAttendances">;
};

export default function UserEventAttendancesScreen({
  navigation,
}: UserEventAttendancesScreenProps) {
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
          events={events?.attendances}
          onEventSelect={(event) => console.log(event)}
        />
      </View>
    </View>
  )
}