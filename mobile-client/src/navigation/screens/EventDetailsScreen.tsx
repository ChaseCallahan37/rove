import {
  Alert,
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { style as tw } from "twrnc";

import { AppNavigationProp } from "../AppNavigations";
import { retrieveEvent } from "../../api/events/event";
import eventApi from "../../api/events";
import { useCallback, useEffect } from "react";
import useApi from "../../hooks/useApi";
import format from "../../utils/format";
import { useFocusEffect } from "@react-navigation/native";

export type EventDetailsScreenParams = {
  eventId: string;
};

export type EventDetailsScreenProps = {
  navigation: AppNavigationProp<"EventDetails">;
  route: {
    params: EventDetailsScreenParams;
  };
};

function EventDetailsScreen({
  route: {
    params: { eventId },
  },
}: EventDetailsScreenProps) {
  const {
    loading,
    error,
    data: event,
    request: getEvent,
  } = useApi(retrieveEvent);
  const { request: joinEvent, data: joinEventSuccess } = useApi(
    eventApi.joinEvent,
    true
  );

  useFocusEffect(
    useCallback(() => {
      getEvent(eventId);
    }, [joinEventSuccess])
  );

  const handleOnJoin = async () => {
    const success = await joinEvent(event?.id);

    // @ts-ignore
    if (success) {
      Alert.alert("Successfully joined event!");
    } else {
      Alert.alert("Unable to join event, please try again");
    }
  };

  return (
    <View style={tw(["flex-1", "bg-slate-100", "py-8", "px-2"])}>
      {loading ? (
        <Text style={{ color: "red" }}>Loading</Text>
      ) : error ? (
        <Text style={{ color: "red" }}>Error</Text>
      ) : (
        event && (
          <ScrollView>
            <View style={tw(["grow", "px-2"])}>
              <View
                style={tw([
                  "bg-sky-200",
                  "rounded-full",
                  "p-2",
                  "flex",
                  "flex-row",
                  "items-center",
                  "justify-around",
                ])}
              >
                <Text style={tw(["text-black", "font-bold", "text-lg"])}>
                  {event.title}
                </Text>
                {
                  <Text style={tw(["text-black", "text-sm"])}>
                    {format.shortDate(event.date)}
                  </Text>
                }
              </View>

              {event.owner && (
                <View
                  style={tw([
                    "bg-sky-200",
                    "rounded-full",
                    "p-2",
                    "flex",
                    "flex-row",
                    "items-center",
                    "justify-around",
                  ])}
                >
                  <Text style={tw(["text-black", "font-bold", "text-lg"])}>
                    Created By: {event.owner.user_name}
                  </Text>
                </View>
              )}
              <View style={tw(["mt-16", "rounded", "bg-slate-200"])}>
                <Image
                  style={tw(["w-full", "h-72", "rounded-t"])}
                  source={{
                    uri: "https://cdn.dribbble.com/users/1409624/screenshots/11850998/media/445dea8b45ff2bf796545364620bccd4.png?resize=400x300&vertical=center",
                  }}
                />

                <View style={tw(["p-2"])}>
                  <Text style={tw(["text-black", "text-sm"])}>
                    {event.title}
                  </Text>
                  <Text
                    style={tw(["text-black", "text-base", "font-semibold"])}
                  >
                    {`${event.attendees?.length} Attendee${
                      event.attendees?.length !== 1 ? "s" : ""
                    }`}
                  </Text>
                </View>
              </View>
              <Button title="Join Event" onPress={handleOnJoin} />
            </View>
            <Text style={tw(["text-black"])}>Attendees</Text>
            {event.attendees?.map(({ user_name }, index) => (
              <Text style={tw(["text-black"])} key={index}>
                {user_name}
              </Text>
            ))}
          </ScrollView>
        )
      )}
    </View>
  );
}

export default EventDetailsScreen;
