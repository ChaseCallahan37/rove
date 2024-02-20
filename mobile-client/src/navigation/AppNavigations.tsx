import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import EventCreateScreen from "./screens/EventCreateScreen";
import EventMapScreen from "./screens/EventMapScreen";
import EventDetailsScreen, {
  EventDetailsScreenParams,
} from "./screens/EventDetailsScreen";

export type AppNavigationProp<
  T extends "Home" | "EventMap" | "EventCreate" | "EventDetails"
> = NavigationProp<
  {
    Home: undefined;
    EventMap: undefined;
    EventCreate: undefined;
    EventDetails: EventDetailsScreenParams;
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
        {/*@ts-ignore          */}
        <Stack.Screen name={"EventDetails"} component={EventDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
