import { useState } from "react";
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
import AppMapView from "../../components/AppMapView";
import { AppNavigationProp } from "../AppNavigations";
import AppTextInput from "../../components/AppTextInput";
import InputGroup from "../../components/InputGroup";

import { Event, createEvent } from "../../api/events/event";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import useToggle from "../../hooks/useToggle";
import { EventDetailsScreenParams } from "./EventDetailsScreen";
import deepCopy from "../../utils/deepCopy";

export type EventUpdateScreenParams = {
  event: Event;
};

type EventUpdateScreenProps = {
  navigation: AppNavigationProp<"EventUpdate">;
  route: {
    params: EventUpdateScreenParams;
  };
};

export default function EventUpdateScreen({
  navigation,
  route: {
    params: { event },
  },
}: EventUpdateScreenProps) {


  const { request } = useApi(createEvent, true);

  const { isToggled, toggle } = useToggle(false);

  const { account } = useAuth();

  const handleUpdateCoordinate = (coordinate: {
    latitude: number;
    longitude: number;
  }) => {
    eventCopy.latitude = coordinate.latitude;
    eventCopy.longitude = coordinate.longitude
  };

  const handleSubmit = async () => {
    if (!eventCopy.latitude || !eventCopy.longitude) {
      throw Error("Must provide coordinates");
    }
    const myEvent = {
      date: eventCopy.date,
      latitude: eventCopy.latitude,
      longitude: eventCopy.longitude,
      title: eventCopy.title,
    };

    const succeeded = await request(myEvent);

    if (!succeeded) {
      return Alert.alert("Failed to update event, please try again");
    }

    Alert.alert("Event succesfully updated");
    navigation.navigate("EventOwnerDetails", {eventId: event.id});
  };

  if (account?.user?.id !== event.owner?.id) {
    return (
      <>
        <Text style={tw(["text-black"])}>
          You do not have access to this resource
        </Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </>
    );
  }

  const eventCopy = deepCopy<Event>(event)

  return (
    <SafeAreaView>
      <Text>Event Update Screen</Text>
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
          <Text style={{ color: "blue" }}>EVENT Update SCREEN</Text>
          <InputGroup label={{ size: "1/5", text: "Event Title" }}>
            <AppTextInput
              updateValue={(text) => eventCopy.title = text}
              defaultValue={event.title} 
            />
          </InputGroup>
          <InputGroup label={{ text: "Event Date", size: "2/5" }}>
            <AppDatePicker
              mode="datetime"
              date={event.date}
              updateDate={(date) => eventCopy.date = date}
              
            />
          </InputGroup>
          <View>
            <Button title="Choose Location" onPress={toggle} />

            {isToggled && (
              <AppMapView
                onDoublePress={handleUpdateCoordinate}
                onLongPress={handleUpdateCoordinate}
                pins={[{latitude: event.latitude, longitude: event.longitude}]}
              />
            )}
            <Button title="Submit" onPress={() => handleSubmit()} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
