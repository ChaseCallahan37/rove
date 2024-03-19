import { Alert, Button, Image, ScrollView, Text, View } from "react-native";
import { style as tw } from "twrnc";

import { AppNavigationProp } from "../AppNavigations";
import { retrieveEvent } from "../../api/events/event";
import eventApi from "../../api/events";
import { useCallback, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { useFocusEffect } from "@react-navigation/native";
import format from "../../utils/format";
import AttendeeList from "../../components/AttendeeList";

export type EventOwnerDetailsScreenParams = {
  eventId: string;
};

export type EventOwnerDetailsScreenProps = {
  navigation: AppNavigationProp<"EventDetails">;
  route: {
    params: EventOwnerDetailsScreenParams;
  };
};

export default function EventOwnerDetailsScreen({
  route: {
    params: { eventId },
  },
  navigation,
}: EventOwnerDetailsScreenProps) {
  const {
    loading,
    error,
    data: event,
    request: getEvent,
  } = useApi(retrieveEvent);

  useFocusEffect(
    useCallback(() => {
      getEvent(eventId);
    }, [])
  );

  return (
    <View style={tw(["flex-1", "bg-slate-100", "py-8", "px-2"])}>
      <Text style={tw(["text-black"])}>Event Owner Screen</Text>
      {!event ? (
        <Text style={tw(["text-black"])}>Loading</Text>
      ) : (
        <Button
          title="Edit Event"
          onPress={() => navigation.navigate("EventUpdate", { event: event })}
        />
      )}
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
            </View>
            <Text style={tw(["text-black"])}>Attendees</Text>
            <AttendeeList
              onAttendeePress={(user) =>
                navigation.navigate("UserProfile", { user })
              }
              attendees={event.attendees}
            />
          </ScrollView>
        )
      )}
    </View>
  );
}
