import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import EventCreateScreen from "./screens/EventCreateScreen";
import EventMapScreen from "./screens/EventMapScreen";
import EventDetailsScreen, {
  EventDetailsScreenParams,
} from "./screens/EventDetailsScreen";
import LoginScreen from "./screens/LoginScreen";
import AccountScreen from "./screens/AccountScreen";
import CreateAccountScreen from "./screens/AccountCreateScreen";
import AccountUpadateScreen from "./screens/AccountUpdateScreen";
import UserEventsCreatedScreen from "./screens/UserEventsCreatedScreen";
import UserEventAttendancesScreen from "./screens/UserEventAttendancesScreen";
import EventOwnerDetailsScreen, { EventOwnerDetailsScreenParams } from "./screens/EventOwnerDetailsScreen";
import EventUpdateScreen from "./screens/EventUpdateScreen";

export type AppNavigationProp<
  T extends
    | "Home"
    | "EventMap"
    | "EventCreate"
    | "EventDetails"
    | "EventOwnerDetails"
    | "EventUpdate"
    | "Login"
    | "Account"
    | "AccountCreate"
    | "AccountUpdate"
    | "UserEventsCreated"
    | "UserEventAttendances"
> = NavigationProp<
  {
    Home: undefined;
    EventMap: undefined;
    EventCreate: undefined;
    EventDetails: EventDetailsScreenParams;
    EventOwnerDetails: EventOwnerDetailsScreenParams;
    EventUpdate: undefined;
    Login: undefined;
    Account: undefined;
    AccountCreate: undefined;
    AccountUpdate: undefined;
    UserEventsCreated: undefined;
    UserEventAttendances: undefined;
  },
  T
>;

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Home"} component={HomeScreen} />
        <Stack.Screen name={"EventMap"} component={EventMapScreen} />
        <Stack.Screen name={"EventCreate"} component={EventCreateScreen} />
        {/* @ts-ignore */}
        <Stack.Screen name={"EventDetails"} component={EventDetailsScreen} />
        {/* @ts-ignore */}
        <Stack.Screen name={"EventOwnerDetails"} component={EventOwnerDetailsScreen} />
        <Stack.Screen name={"EventUpdate"} component={EventUpdateScreen} />
        <Stack.Screen name={"Login"} component={LoginScreen} />
        <Stack.Screen name={"Account"} component={AccountScreen} />
        <Stack.Screen name={"AccountCreate"} component={CreateAccountScreen} />
        <Stack.Screen name={"AccountUpdate"} component={AccountUpadateScreen} />
        <Stack.Screen
          name={"UserEventsCreated"}
          component={UserEventsCreatedScreen}
        />
        <Stack.Screen
          name={"UserEventAttendances"}
          component={UserEventAttendancesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
