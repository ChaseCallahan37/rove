import { Text, View } from "react-native";
import EventMap from "../../components/EventMap";

function EventMapScreen() {
  return (
    <View>
      <Text style={{ color: "blue" }}>EVENT MAP SCREEN</Text>
      <EventMap />
    </View>
  );
}

export default EventMapScreen;
