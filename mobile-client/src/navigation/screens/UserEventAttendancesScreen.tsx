import { Text, View } from "react-native";
import { style as tw } from "twrnc";

import useApi from "../../hooks/useApi";
import { useEffect } from "react";
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
  } = useApi(userApi.retrieveUserEvents);

  if (!account?.user) {
    return <Text style={tw(["text-black"])}>Loading...</Text>;
  }

  useEffect(() => {
    userEventsRequest();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: "blue" }}>USER CREATED EVENTS</Text>
      <View style={{ flex: 1 }}>
        <EventList
          events={events?.attendances}
          onEventSelect={(event) =>
            navigation.navigate("EventDetails", { eventId: event.id })
          }
        />
      </View>
    </View>
  );
}
