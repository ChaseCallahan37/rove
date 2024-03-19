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
import eventApi from "../../api/events";
import { User } from "../../api/user/user";
import format from "../../utils/format";

export type UserProfileScreenParams = {
  user: User;
};

type UserProfileScreenProps = {
  navigation: AppNavigationProp<"EventUpdate">;
  route: {
    params: UserProfileScreenParams;
  };
};

export default function UserProfileScreen({
  navigation,
  route: {
    params: {
      user: { user_name, dob, first_name, gender, last_name },
    },
  },
}: UserProfileScreenProps) {
  return (
    <View style={tw(["bg-slate-400"])}>
      <Text style={tw(["text-lg"])}>Profile Screen - {user_name}</Text>

      <Text>
        {first_name} {last_name}
      </Text>
      {dob && <Text>{format.shortDate(dob)} </Text>}
      <Text>{gender}</Text>
    </View>
  );
}
