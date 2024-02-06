import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screens/HomeScreen"
import EventMap from "../components/EventMap"
import EventCreateScreen from "./screens/EventCreateScreen"

// We want to define the routes here and export them throughout our app
// so that we do not mispell the name of the routes in other places
export const routes = {
    home: "HOME",
    eventMap: "EVENT_MAP",
    eventCreate: "EVENT_CREATE"
}

const Stack = createNativeStackNavigator()

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name={routes.home}
                    component={HomeScreen}
                />
                <Stack.Screen 
                    name={routes.eventMap}
                    component={EventMap}
                />
                <Stack.Screen 
                    name={routes.eventCreate}
                    component={EventCreateScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation