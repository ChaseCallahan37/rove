import { Button, Text, View } from "react-native";
import { AppNavigationProp } from "../AppNavigations";

import tw from 'twrnc'
type HomeScreenProps = {
  navigation: AppNavigationProp<"Home">;
};

function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View>
      <Text style={tw.style(['text-black'])}>Home Screen</Text>
      <Button
        title="Go To Events"
        onPress={() => navigation.navigate("EventMap")}
      />
      <Button
        title="Create new Event"
        onPress={() => navigation.navigate("EventCreate")}
      />
    </View>
  );
}

export default HomeScreen;
