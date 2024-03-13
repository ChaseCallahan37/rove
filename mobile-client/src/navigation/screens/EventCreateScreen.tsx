import { useRef, useState } from "react";
import {
  Text,
  SafeAreaView,
  Button,
  Alert,
  View,
  ScrollView,
} from "react-native";
import { style as tw } from "twrnc";

import AppDatePicker from "../../components/AppDatePicker";
import AppMapView, { Pin } from "../../components/AppMapView";
import { AppNavigationProp } from "../AppNavigations";
import AppTextInput from "../../components/AppTextInput";
import InputGroup from "../../components/InputGroup";

import { createEvent } from "../../api/events/event";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import useToggle from "../../hooks/useToggle";
import LocationSearch from "../../components/LocationSearch";
import { Place } from "../../api/maps/map";

type EventCreateScreenProps = {
  navigation: AppNavigationProp<"EventCreate">;
};

function EventCreateScreen({ navigation }: EventCreateScreenProps) {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventCoordinate, setEventCoordinate] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const [searchLocations, setSearchLocations] = useState<null | Place[]>(null)

  const { request } = useApi(createEvent, true);

  const { isToggled, toggle } = useToggle(false);

  const { account } = useAuth();

  const mapRef = useRef(null);

  const handleUpdateCoordinate = (coordinate: {
    latitude: number;
    longitude: number;
  }) => {
    setEventCoordinate(coordinate);
  };

  const handleSubmit = async () => {
    if (!eventCoordinate) {
      throw Error("Must provide coordinates");
    }
    const { latitude, longitude } = eventCoordinate;
    const myEvent = {
      date: eventDate,
      latitude,
      longitude,
      title: eventTitle,
    };

    const succeeded = await request(myEvent);

    if (!succeeded) {
      return Alert.alert("Your request failed, please try again");
    }

    Alert.alert("Event succesrully cretaed");
    navigation.navigate("Home");
  };

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

  const handleOnPinPress = (pin: Pin) => {
    
    Alert.alert("Location Chosen", `Setting location for event to ${pin.name} at ${pin.address}`);

    setEventCoordinate({latitude: pin.latitude, longitude: pin.longitude})
  }

  const handleFormatPins = (searchLocations: Place[] | null, eventCoordinate: {latitude: number, longitude: number} | null | undefined) => {
    const searchPins = searchLocations?.map(({latitude, longitude, icon: {url}, name, address}) => ({latitude, longitude, imageUrl: url, name, address,}))

    if(searchPins && eventCoordinate) return [eventCoordinate, ...searchPins]

    if(eventCoordinate) return [eventCoordinate]

    return searchPins
  }

  return (
    <SafeAreaView style={tw(['pb-3'])}>
      {!account ? (
        <>
          <Text style={tw(["text-black"])}>
            Please Sign in to create an event
          </Text>
          {!account ? (
            <>
              <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
              />
              <Button
                title="Create Account"
                onPress={() => navigation.navigate("AccountCreate")}
              />
            </>
          ) : (
            <Button
              title="Account"
              onPress={() => navigation.navigate("Account")}
            />
          )}
        </>
      ) : (
        <ScrollView>
          <InputGroup label={{ size: "1/5", text: "Event Title" }}>
            <AppTextInput
              updateValue={(text) => setEventTitle(text)}
              value={eventTitle}
            />
          </InputGroup>
          <InputGroup label={{ text: "Event Date", size: "2/5" }}>
            <AppDatePicker
              mode="datetime"
              date={eventDate}
              updateDate={(date) => setEventDate(date)}
            />
          </InputGroup>
          <View>
            <LocationSearch
              onLocationSelect={({ latitude, longitude }) =>
                handleMapFocus(latitude, longitude)
              }

              onSearchCompletion={(places) => setSearchLocations(places)}
            />
            <AppMapView
              ref={mapRef}
              
              onPinPress={handleOnPinPress}
              onDoublePress={handleUpdateCoordinate}
              onLongPress={handleUpdateCoordinate}
              pins={handleFormatPins(searchLocations, eventCoordinate)}
            />
            <Button title="Submit" onPress={() => handleSubmit()} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default EventCreateScreen;
