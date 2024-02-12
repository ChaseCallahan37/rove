import { useState } from "react";
import { Text, SafeAreaView, Button } from "react-native";
import useApi from "../../hooks/useApi";
import { Event, createEvent } from "../../api/events/event";
import AppDatePicker from "../../components/AppDatePicker";
import AppNumberInput from "../../components/AppNumberInput";
import AppTextInput from "../../components/AppTextInput";
import InputGroup from "../../components/InputGroup";
import { AppNavigationProp } from "../AppNavigations";


type EventCreateScreenProps = {
  navigation: AppNavigationProp<"ChooseEventLocation">
}

function EventCreateScreen({navigation}: EventCreateScreenProps) {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventLatitude, setEventLatitude] = useState(0);
  const [eventLongitude, setEventLongitude] = useState(0);

  const { request } = useApi(createEvent);

  const handleSubmit = () => {
    const myEvent: Event = {
      date: eventDate,
      latitude: eventLatitude,
      longitude: eventLongitude,
      title: eventTitle,
    };

    console.log(myEvent);

    request(myEvent);
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

      <Button title="Choose Location" />

      <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

export default EventCreateScreen;
