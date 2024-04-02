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
  }: {
    startDate?: Date;
    endDate?: Date;
  }) => {
    getEvents({
      location: {
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
        radius: 10000000,
      },
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
        <Form<{ startDate: Date }>
          onSubmit={({ startDate }) => handleRetrieveEvents({ startDate })}
        >
          {({ isValid, submit }) => (
            <View>
              <Field<Date>
                initialValue={new Date()}
                name="startDate"
                onBlurValidate={z.date()}
              >
                {({ value, setValue, onBlur, errors }) => (
                  <View>
                    <AppDatePicker
                      mode="date"
                      date={value}
                      updateDate={(date) => setValue(date)}
                    />
                  </View>
                )}
              </Field>
              <Button onPress={submit} disabled={!isValid} title="Submti" />
            </View>
          )}
        </Form>

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
