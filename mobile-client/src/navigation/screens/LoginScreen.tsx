import { Alert, Button, Text, View } from "react-native";
import { style as tw } from "twrnc";

import { AppNavigationProp } from "../AppNavigations";
import AppTextInput from "../../components/AppTextInput";
import InputGroup from "../../components/InputGroup";

import useAuth from "../../hooks/useAuth";

type LoginScreenProps = {
  navigation: AppNavigationProp<"Login">;
};

function LoginScreen({ navigation }: LoginScreenProps) {
  const { account, signIn } = useAuth();

  const credentials = { email: "", password: "" };

  const handleSignIn = async () => {
    const success = await signIn(credentials);

    if (success) {
      Alert.alert("Succesfully signed in!");
      navigation.goBack();
    } else {
      Alert.alert("Failed to sign in, please try again");
    }
  };
  return (
    <View style={tw(["px-3", "mt-6", "bg-red-800"])}>
      <View style={tw(["bg-pink-500"])}>
        <InputGroup label={{ text: "Email", size: "1/5" }}>
          <AppTextInput
            updateValue={(newValue) => {
              credentials.email = newValue;
            }}
          />
        </InputGroup>
        <InputGroup label={{ text: "Password", size: "1/5" }}>
          <AppTextInput
            updateValue={(newValue) => {
              credentials.password = newValue;
            }}
            secureTextEntry={true}
          />
        </InputGroup>
        <Button title="Login" onPress={handleSignIn}></Button>
        {account && <Text>{JSON.stringify(account)}</Text>}
      </View>
      <Button title="Create an Account" onPress={() => navigation.navigate("AccountCreate")}/>
    </View>
  );
}

export default LoginScreen;
