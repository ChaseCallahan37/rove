import { Alert, Button, Text, View } from "react-native";
import { AppNavigationProp } from "../AppNavigations";

import { style as tw } from "twrnc";
import useApi from "../../hooks/useApi";
import { signIn } from "../../api/account/account";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import InputGroup from "../../components/InputGroup";
import AppTextInput from "../../components/AppTextInput";
import accountApi from "../../api/account";
type CreateAccountScreenProps = {
  navigation: AppNavigationProp<"CreateAccount">;
};

function CreateAccountScreen({ navigation }: CreateAccountScreenProps) {
  const { createAccount } = useAuth();

  const accountInfo = { email: "", userName: "", password: "" };

  const handleCreateAccount = async () => {
    const isSuccess = await createAccount(accountInfo);
    if (isSuccess) {
      return navigation.navigate("Home");
    } else {
      Alert.alert("Failed to create account");
    }
  };

  return (
    <View style={tw(["px-3", "mt-6", "bg-red-800"])}>
      <View style={tw(["bg-pink-500"])}>
        <InputGroup label={{ text: "Email", size: "1/5" }}>
          <AppTextInput
            updateValue={(newValue) => {
              accountInfo.email = newValue;
            }}
          />
        </InputGroup>
        <InputGroup label={{ text: "Username", size: "1/5" }}>
          <AppTextInput
            updateValue={(newValue) => {
              accountInfo.userName = newValue;
            }}
          />
        </InputGroup>
        <InputGroup label={{ text: "Password", size: "1/5" }}>
          <AppTextInput
            updateValue={(newValue) => {
              accountInfo.password = newValue;
            }}
          />
        </InputGroup>

        <Button title="Create" onPress={handleCreateAccount}></Button>
      </View>
    </View>
  );
}

export default CreateAccountScreen;
