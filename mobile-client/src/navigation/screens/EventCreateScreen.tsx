import { useEffect, useRef, useState } from "react";
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
import usePlaceSearch from "../../hooks/usePlaceSearch";

// @ts-ignore
import SearchLocationsIcon from "../../../assets/search-locations-icon.png";

// @ts-ignore
import GenericLocationIcon from "../../../assets/generic-location-icon.png";
import AppDropdown from "../../components/AppDropdown";
import tagApi from "../../api/tags";
import useForm from "../../hooks/useForm";
import eventApi from "../../api/events";

type EventCreateScreenProps = {
  navigation: AppNavigationProp<"EventCreate">;
};

function EventCreateScreen({ navigation }: EventCreateScreenProps) {
  const { searchLoading, searchGooglePlaces, searchResults } = usePlaceSearch();
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const { submitForm, formData } = useForm(
    { tags: [], date: new Date(Date.now()) },
    eventApi.createEvent
  );

  const { data: tags, request: getTags } = useApi(tagApi.retrieveTags);
  const { isToggled, toggle } = useToggle(false);
  const { account } = useAuth();
  const mapRef = useRef(null);

  useEffect(() => {
    getTags();
  }, []);

  const handleUpdateCoordinate = ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    setSelectedLocation({ latitude, longitude });
    console.log("IN HANDLE UPDATE");
    console.log(latitude, longitude);

    formData.latitude = latitude;
    formData.longitude = longitude;
  };

  const handleSubmit = async () => {
    const succeeded = await submitForm();

    if (!succeeded) {
      return Alert.alert("Your request failed, please try again");
    }

    Alert.alert("Event succesrully cretaed");
    navigation.navigate("Home");
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

  const handleOnPinPress = (pin: Pin) => {
    Alert.alert(
      "Location Chosen",
      `Setting location for event to ${pin.name} at ${pin.address}`
    );

    handleUpdateCoordinate({
      latitude: pin.latitude,
      longitude: pin.longitude,
    });
  };

  const handleFormatPins = (
    searchLocations: Place[] | undefined | null,
    eventCoordinate: { latitude: number; longitude: number } | null | undefined
  ): Pin[] | undefined => {
    const searchPins = searchLocations?.map(
      ({ latitude, longitude, name, address }) => ({
        latitude,
        longitude,
        image: SearchLocationsIcon,
        name,
        address,
      })
    );

    if (searchPins && eventCoordinate) {
      const chosenPin = searchPins.find(
        ({ latitude, longitude }) =>
          eventCoordinate.latitude === latitude &&
          eventCoordinate.longitude === longitude
      );

      if (chosenPin) {
        chosenPin.image = GenericLocationIcon;
        return searchPins;
      }
      return [
        ...searchPins,
        {
          latitude: eventCoordinate.latitude,
          longitude: eventCoordinate.longitude,
          name: "Selected Location",
          image: GenericLocationIcon,
        },
      ];
    }

    if (eventCoordinate) return [eventCoordinate];

    return searchPins;
  };

  return (
    <SafeAreaView style={tw(["pb-3"])}>
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
              updateValue={(text) => (formData.title = text)}
              value={formData.title}
            />
          </InputGroup>
          <InputGroup label={{ size: "1/5", text: "Event Description" }}>
            <AppTextInput
              updateValue={(text) => (formData.description = text)}
              value={formData.description}
            />
          </InputGroup>

          <InputGroup label={{ text: "Event Date", size: "2/5" }}>
            <AppDatePicker
              mode="datetime"
              date={formData.date}
              updateDate={(date) => (formData.date = date)}
            />
          </InputGroup>

          <InputGroup>
            <AppDropdown
              onChange={(value) => formData.tags?.push(value)}
              data={tags?.map(({ name, id }) => ({ label: name, value: id }))}
            />
          </InputGroup>
          <View>
            <LocationSearch
              loading={searchLoading}
              onSearch={(text) => searchGooglePlaces(text)}
              searchedItems={searchResults}
              onItemSelect={({ latitude, longitude }) =>
                handleMapFocus(latitude, longitude)
              }
            />
            <AppMapView
              ref={mapRef}
              onPinPress={handleOnPinPress}
              onDoublePress={handleUpdateCoordinate}
              onLongPress={handleUpdateCoordinate}
              pins={handleFormatPins(searchResults, selectedLocation)}
            />
            <Button title="Submit" onPress={() => handleSubmit()} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default EventCreateScreen;
