import { Text, View } from "react-native";
import { style as tw } from "twrnc";

import useApi from "../../hooks/useApi";
import { useEffect, useRef } from "react";
import eventApi from "../../api/events";
import AppMapView from "../../components/AppMapView";
import EventList from "../../components/EventList";
import { AppNavigationProp } from "../AppNavigations";
import useAuth from "../../hooks/useAuth";

type UserEventsCreatedScreenProps = {
  navigation: AppNavigationProp<"UserEventsCreated">;
};

function UserEventsCreatedScreen({ navigation }: UserEventsCreatedScreenProps) {
  const { account } = useAuth();
  const { data: events, request, loading } = useApi();

  if (!account?.user) {
    return <Text style={tw(["text-black"])}>Loading...</Text>;
  }

  // @ts-ignore
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: "blue" }}>EVENT MAP SCREEN</Text>
      <View style={{ flex: 1 }}>
        <AppMapView
          onPinPress={({ eventID: eventId }) =>
            navigation.navigate("EventDetails", { eventId })
          }
          ref={mapRef}
          // @ts-ignore
          pins={
            events &&
            // @ts-ignore
            events.map(({ latitude, longitude, id }) => ({
              latitude,
              longitude,
              id,
            }))
          }
        ></AppMapView>
        <Text style={{ color: "pink" }}>NEARBY EVENTS</Text>

        {/*@ts-ignore          */}
        {loading ? (
          <Text style={{ color: "brown" }}>Loading...</Text>
        ) : (
          <EventList mapRef={mapRef} events={events} />
        )}
      </View>
    </View>
  );
}
