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

import { createEvent } from "../../api/events/event";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import useToggle from "../../hooks/useToggle";

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

  const { request } = useApi(createEvent, true);

  const { isToggled, toggle } = useToggle(false);

  const { account } = useAuth();

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

  return (
    <SafeAreaView>
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
          <Text style={{ color: "blue" }}>EVENT CREATE SCREEN</Text>
          <InputGroup label={{ size: "1/5", text: "Event Title" }}>
            <AppTextInput
              updateValue={(text) => setEventTitle(text)}
              value={eventTitle}
            />
          </InputGroup>
          <InputGroup label={{ text: "Event Date", size: "2/5" }}>
            <AppDatePicker
              date={eventDate}
              updateDate={(date) => setEventDate(date)}
            />
          </InputGroup>
          <View>
            <Button title="Choose Location" onPress={toggle} />

            {isToggled && (
              <AppMapView
                onDoublePress={handleUpdateCoordinate}
                onLongPress={handleUpdateCoordinate}
                pins={eventCoordinate && [eventCoordinate]}
              />
            )}
            <Button title="Submit" onPress={() => handleSubmit()} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default EventCreateScreen;
