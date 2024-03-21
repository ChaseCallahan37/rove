import {
  Button,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { style as tw } from "twrnc";

import useApi from "../../hooks/useApi";
import { useEffect, useRef } from "react";
import eventApi from "../../api/events";
import AppMapView, { Pin } from "../../components/AppMapView";
import EventList from "../../components/EventList";
import { AppNavigationProp } from "../AppNavigations";
import mapsApi from "../../api/maps";
import AppTextInput from "../../components/AppTextInput";
import LocationSearch from "../../components/LocationSearch";
import useLocation from "../../hooks/useLocation";

type HomeScreenProps = {
  navigation: AppNavigationProp<"Home">;
};

function EventMapScreen({ navigation }: HomeScreenProps) {
  const {
    data: events,
    request: getEvents,
    loading,
  } = useApi(eventApi.retrieveEvents);

  const { location } = useLocation();

  // @ts-ignore
  useEffect(() => {
    getEvents();
  }, []);

  const mapRef = useRef(null);

  const handleMapFocus = (latitude: number, longitude: number) => {
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
  };

  const handleOnPinPress = ({ id }: Pin) => {
    if (!id) throw new Error("Pins must be passed in with Ids for this screen");

    navigation.navigate("EventDetails", { eventId: id });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {location ? (
          <AppMapView
            startLocation={location}
            onPinPress={handleOnPinPress}
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
        ) : (
          <Text style={tw(["text-black"])}>
            Please Allow this app to use location services
          </Text>
        )}
        <Text style={{ color: "pink" }}>NEARBY EVENTS</Text>

        {/*@ts-ignore          */}
        {loading ? (
          <Text style={{ color: "brown" }}>Loading...</Text>
        ) : (
          <EventList
            onEventSelect={({ latitude, longitude }) =>
              handleMapFocus(latitude, longitude)
            }
            // @ts-ignore
            events={events}
          />
        )}
      </View>
    </View>
  );
}

export default EventMapScreen;
