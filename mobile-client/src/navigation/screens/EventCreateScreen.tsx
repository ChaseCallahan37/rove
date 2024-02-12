import { useState } from "react";
import { Text, SafeAreaView, Button, Alert } from "react-native";
import useApi from "../../hooks/useApi";
import { Event, createEvent } from "../../api/events/event";
import AppDatePicker from "../../components/AppDatePicker";
import AppNumberInput from "../../components/AppNumberInput";
import AppTextInput from "../../components/AppTextInput";
import InputGroup from "../../components/InputGroup";
import { AppNavigationProp } from "../AppNavigations";
import AppMapView from "../../components/AppMapView";
import useToggle from "../../hooks/useToggle";

type EventCreateScreenProps = {
  navigation: AppNavigationProp<"ChooseEventLocation">;
};

function EventCreateScreen({ navigation }: EventCreateScreenProps) {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventCoordinate, setEventCoordinate] = useState<{latitude: number, longitude: number}>();

  const { request } = useApi(createEvent);

  const { isToggled, toggle } = useToggle(false);

  const handleUpdateCoordinate = (coordinate: {latitude: number, longitude: number}) => {
    setEventCoordinate(coordinate)
  }

  const handleSubmit = () => {
    if(!eventCoordinate){
      throw Error("Must provide coordinates")
    }
    const {latitude, longitude} = eventCoordinate
    const myEvent: Event = {
      date: eventDate,
      latitude,
      longitude,
      title: eventTitle,
    };

    request(myEvent);
    navigation.navigate("Home")
  };

  return (
    <SafeAreaView>
      <Text style={{ color: "blue" }}>EVENT CREATE SCREEN</Text>
      <InputGroup label={{ size: "sm", text: "Event Title" }}>
        <AppTextInput
          updateValue={(text) => setEventTitle(text)}
          value={eventTitle}
        />
      </InputGroup>

      <InputGroup label={{ text: "Event Date", size: "sm" }}>
        <AppDatePicker
          date={eventDate}
          updateDate={(date) => setEventDate(date)}
        />
      </InputGroup>

      <InputGroup>
        <Button title="Choose Location" onPress={toggle} />

        {isToggled && <AppMapView onDoublePress={handleUpdateCoordinate} onLongPress={handleUpdateCoordinate} pins={eventCoordinate && [eventCoordinate]}/>}
      </InputGroup>
      <Button title="Submit" onPress={() => handleSubmit()} />
    </SafeAreaView>
  );
}

export default EventCreateScreen;
