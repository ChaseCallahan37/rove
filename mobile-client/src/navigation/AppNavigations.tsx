import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// We want to define the routes here and export them throughout our app
// so that we do not mispell the name of the routes in other places
export const routes = {
    home: "HOME",
    eventMap: "EVENT_MAP"
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation




// function App(): React.JSX.Element {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             name="Home"
//             component={HomeScreen}
//             options={{
//               title: "Welcome"
//             }}
//             />
//             <Stack.Screen 
//               name="Profile"
//               component={ProfileScreen}
//             />
//           {/* <View style={{ flex: 1 }}>
//             <EventMap />
//           </View> */}
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
  
//   // @ts-ignore
//   const HomeScreen = ({navigation}) => {
//     return ( 
//     <Button 
//       title="Go to Jane's profile"
//       onPress={() => navigation.navigate("Profile", {name: "Jane"})}
//     />
//     )
//   }
  
//   // @ts-ignore
//   const ProfileScreen = ({navigation, route}) => {
//     return (
//       <View>
  
//       <Text style={{color: "blue"}}>This is {route.params.name}'s profile</Text>
//       <Button title={route.params.name}/>
//       </View>
//     )
//   }
  