import { Text, View } from "react-native";
import useApi from "../../hooks/useApi";
import { useEffect, useRef } from "react";
import eventApi from "../../api/events";
import AppMapView from "../../components/AppMapView";
import EventList from "../../components/EventList";
import { AppNavigationProp } from "../AppNavigations";

type HomeScreenProps = {
  navigation: AppNavigationProp<"Home">;
};

function EventMapScreen({ navigation }: HomeScreenProps) {
  const {
    data: events,
    request: getEvents,
    loading,
  } = useApi(eventApi.retrieveEvents);

  // @ts-ignore
  useEffect(() => {
    getEvents();
  }, []);

  const mapRef = useRef(null);

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
          <EventList
            onEventSelect={({ latitude, longitude }) => {
              if (!mapRef) return null;

              // @ts-ignore
              mapRef.current.animateToRegion(
                {
                  latitude,
                  longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                },
                1000
              );
            }}
            // @ts-ignore
            events={events}
          />
        )}
      </View>
    </View>
  );
}

export default EventMapScreen;
