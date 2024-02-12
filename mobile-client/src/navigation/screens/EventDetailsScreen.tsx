import { Text, View } from "react-native";
import { AppNavigationProp } from "../AppNavigations";
import { Event } from "../../api/events/event";

export type EventDetailsScreenParams = {
  event: Event;
};

export type EventDetailsScreenProps = {
  navigation: AppNavigationProp<"EventDetails">;
  route: {
    params: EventDetailsScreenParams;
  };
};

function EventDetailsScreen({
  navigation,
  route: { params: event },
}: EventDetailsScreenProps) {
  return (
    <View>
      <Text style={{ color: "yellow" }}>{JSON.stringify(event)}</Text>
    </View>
  );
}

export default EventDetailsScreen;
