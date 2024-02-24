import { Button, Text, View } from "react-native";
import { AppNavigationProp } from "../AppNavigations";

import tw from "twrnc";
import useApi from "../../hooks/useApi";
import { signIn } from "../../api/account/account";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import InputGroup from "../../components/InputGroup";
import AppTextInput from "../../components/AppTextInput";
type LoginScreenProps = {
  navigation: AppNavigationProp<"Login">;
};

function LoginScreen({ navigation }: LoginScreenProps) {
  const { user, logIn, logOut } = useAuth();
  const credentials = { email: "", password: "" };
  return (
    <View>
      <Text style={tw.style(["text-black"])}>Login Screen</Text>

      <InputGroup label={{ text: "Email", size: "sm" }}>
        <AppTextInput
          updateValue={(newValue) => {
            credentials.email = newValue;
          }}
        />
      </InputGroup>
      <InputGroup label={{ text: "Password", size: "sm" }}>
        <AppTextInput
          updateValue={(newValue) => {
            credentials.password = newValue;
          }}
        />
      </InputGroup>
      <Button
        title="Login"
        onPress={() => logIn(credentials.email, credentials.password)}
      ></Button>
      {user && <Text>{JSON.stringify(user)}</Text>}
    </View>
  );
}

export default LoginScreen;
