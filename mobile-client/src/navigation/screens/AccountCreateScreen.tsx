import { Alert, Button, View } from "react-native";
import { style as tw } from "twrnc";

import { AppNavigationProp } from "../AppNavigations";
import AppTextInput from "../../components/AppTextInput";
import InputGroup from "../../components/InputGroup";
import useAuth from "../../hooks/useAuth";

type AccountCreateScreenProps = {
  navigation: AppNavigationProp<"AccountCreate">;
};

function AccountCreateScreen({ navigation }: AccountCreateScreenProps) {
  const { createAccount } = useAuth();

  const accountInfo = { email: "", userName: "", password: "", rePassword: "" };

  const handleCreateAccount = async () => {
    if (accountInfo.password !== accountInfo.rePassword) {
      Alert.alert("Passwords must match");
    }
    const isSuccess = await createAccount(accountInfo);
    if (isSuccess) {
      Alert.alert("Account succesfully created!");
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
            secureTextEntry={true}
          />
        </InputGroup>

        <InputGroup label={{ text: "Re-Password", size: "1/5" }}>
          <AppTextInput
            updateValue={(newValue) => {
              accountInfo.rePassword = newValue;
            }}
            secureTextEntry={true}
          />
        </InputGroup>

        <Button title="Create" onPress={handleCreateAccount}></Button>
      </View>
    </View>
  );
}

export default AccountCreateScreen;
