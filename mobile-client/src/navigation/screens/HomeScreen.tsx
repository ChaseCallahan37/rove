import { Alert, Button, Text, View } from "react-native";
import tw from "twrnc";

import { AppNavigationProp } from "../AppNavigations";
import useAuth from "../../hooks/useAuth";
import useLocation from "../../hooks/useLocation";
import AppForm from "../../components/AppForm";

type HomeScreenProps = {
  navigation: AppNavigationProp<"Home">;
};

function HomeScreen({ navigation }: HomeScreenProps) {
  const { account } = useAuth();

  return (
    <View>
      <Text style={tw.style(["text-black"])}>
        Home Screen {account && `Hello ${account.user?.user_name}`}
      </Text>
      <Button
        title="Go To Events"
        onPress={() => navigation.navigate("EventMap")}
      />
      <Button
        title="Create new Event"
        onPress={() => navigation.navigate("EventCreate")}
      />
      {!account ? (
        <>
          <Button title="Login" onPress={() => navigation.navigate("Login")} />
          <Button
            title="Create Account"
            onPress={() => navigation.navigate("AccountCreate")}
          />
        </>
      ) : (
        <Button
          title="Account"
          onPress={() => navigation.navigate("Account")}
        />
      )}
      <AppForm<{email: string}> onSubmit={(values) => Alert.alert(JSON.stringify(values))}>
        <Text>Form</Text>
        <Text>Form</Text>
      </AppForm>
    </View>
  );
}

export default HomeScreen;
