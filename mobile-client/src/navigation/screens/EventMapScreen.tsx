import { Text, View } from "react-native";
import useApi from "../../hooks/useApi";
import { useEffect, useRef } from "react";
import eventApi from "../../api/events";
import AppMapView from "../../components/AppMapView";
import EventList from "../../components/EventList";

function EventMapScreen() {
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
          ref={mapRef}
          // @ts-ignore
          pins={
            events &&
            // @ts-ignore
            events.map(({ latitude, longitude }) => ({ latitude, longitude }))
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

export default EventMapScreen;
