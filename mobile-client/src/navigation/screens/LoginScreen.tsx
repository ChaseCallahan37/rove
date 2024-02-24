import { Button, Text, View } from "react-native";
import { AppNavigationProp } from "../AppNavigations";

import {style as tw} from "twrnc";
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
    <View style={tw(['px-3', 'mt-6', 'bg-red-800'])}>

      <View style={tw(['bg-pink-500'])}>

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
        />
      </InputGroup>
      <Button
        title="Login"
        onPress={() => logIn(credentials.email, credentials.password)}
      ></Button>
      {user && <Text>{JSON.stringify(user)}</Text>}

      </View>
    </View>
  );
}

export default LoginScreen;
