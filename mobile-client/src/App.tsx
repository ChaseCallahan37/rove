import React from "react";
import type { PropsWithChildren } from "react";
import {
  Button,
  Text,
  View,
} from "react-native";

import { enableLatestRenderer } from "react-native-maps";
import AppNavigation from "./navigation/AppNavigations";

// We do this to allow the react-native-maps library to properly render
// the most recent and up to date version of maps.
enableLatestRenderer();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  return (
   <AppNavigation /> 
  );
}

// @ts-ignore
const HomeScreen = ({navigation}) => {
  return ( 
  <Button 
    title="Go to Jane's profile"
    onPress={() => navigation.navigate("Profile", {name: "Jane"})}
  />
  )
}

// @ts-ignore
const ProfileScreen = ({navigation, route}) => {
  return (
    <View>

    <Text style={{color: "blue"}}>This is {route.params.name}'s profile</Text>
    <Button title={route.params.name}/>
    </View>
  )
}

export default App;
