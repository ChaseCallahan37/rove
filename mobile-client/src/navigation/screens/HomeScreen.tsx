import { Button, Text, View } from "react-native";
import { AppNavigationProp } from "../AppNavigations";

type HomeScreenProps = {
  navigation: AppNavigationProp<"Home">;
};

function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View>
      <Text style={{ color: "blue" }}>Home Screen</Text>
      <Button
        title="Go To Events"
        onPress={() => navigation.navigate("EventMap")}
      />
      <Button
        title="Create new Event"
        onPress={() => navigation.navigate("EventCreate")}
      />
      <Button
        title="Event Detail Screen"
        onPress={() =>
          navigation.navigate("EventDetails", {
            event: {
              title: "Test",
              latitude: 33.2132,
              longitude: -87.2313,
              date: new Date(),
            },
          })
        }
      />
    </View>
  );
}

export default HomeScreen;
