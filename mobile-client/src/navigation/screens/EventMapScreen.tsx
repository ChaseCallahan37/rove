import { Alert, Button, Text, TextInput, View } from "react-native";
import { style as tw } from "twrnc";

import useApi from "../../hooks/useApi";
import { useEffect, useRef } from "react";
import eventApi from "../../api/events";
import AppMapView, { Pin } from "../../components/AppMapView";
import EventList from "../../components/EventList";
import { AppNavigationProp } from "../AppNavigations";
import useLocation from "../../hooks/useLocation";
import { Field, Form } from "houseform";
import { z } from "zod";
import AppDatePicker from "../../components/AppDatePicker";
import EventFilterForm from "../../forms/EventFilterForm";

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

  useEffect(() => {
    getEvents({
      location: {
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
        radius: 10000000,
      },
    });
  }, []);

  const mapRef = useRef(null);

  const handleRetrieveEvents = ({
    startDate,
    endDate,
    radius,
  }: {
    startDate?: Date;
    endDate?: Date;
    radius?: number;
  }) => {
    console.log(radius);

    getEvents({
      location: radius
        ? {
            latitude: location?.latitude || 0,
            longitude: location?.longitude || 0,
            radius: radius,
          }
        : undefined,

      start_date: startDate,
      end_date: endDate,
    });
  };

  const handleMapFocus = (latitude: number, longitude: number) => {
    if (!mapRef?.current) return null;

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
        <AppMapView
          onPinPress={handleOnPinPress}
          ref={mapRef}
          pins={
            events &&
            events.map(({ location: { latitude, longitude }, id }) => ({
              latitude,
              longitude,
              id,
            }))
          }
        ></AppMapView>
        <Text style={{ color: "pink" }}>NEARBY EVENTS</Text>
        <EventFilterForm onSubmit={(values) => handleRetrieveEvents(values)} />

        {loading ? (
          <Text style={{ color: "brown" }}>Loading...</Text>
        ) : (
          <EventList
            onEventSelect={({ location: { latitude, longitude } }) =>
              handleMapFocus(latitude, longitude)
            }
            events={events}
          />
        )}
      </View>
    </View>
  );
}

export default EventMapScreen;
