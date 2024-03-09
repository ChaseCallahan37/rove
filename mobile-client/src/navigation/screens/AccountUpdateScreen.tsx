import { Alert, Button, Text, View } from "react-native";
import { style as tw } from "twrnc";

import { AppNavigationProp } from "../AppNavigations";
import AppTextInput from "../../components/AppTextInput";
import InputGroup from "../../components/InputGroup";
import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import userApi from "../../api/user";
import deepCopy from "../../utils/deepCopy";

type  AccountUpdateScreenProps= {
  navigation: AppNavigationProp<"AccountCreate">;
};

function AccountUpadateScreen({ navigation }: AccountUpdateScreenProps) {
  const { createAccount, account } = useAuth();

  const {request: updateUserProfile} = useApi(userApi.updateUserProfile)

    if(!account?.user) return

  const updatedUser = deepCopy(account?.user);

  const handleCreateAccount = async () => {
    const isSuccess = await updateUserProfile(updatedUser);
    if (isSuccess) {
      Alert.alert("Account succesfully created!");
      return navigation.navigate("Home");
    } else {
      Alert.alert("Failed to create account");
    }
  };

  return (
    <View style={tw(["px-3", "mt-6", "bg-red-800"])}>
        <Text>UPDATE</Text>
      <View style={tw(["bg-pink-500"])}>
        <InputGroup label={{ text: "First Name", size: "1/5" }}>
          <AppTextInput
            updateValue={(newValue) => {
              updatedUser.first_name = newValue;
            }}
            value={updatedUser.first_name}
          />
        </InputGroup>
        <InputGroup label={{ text: "Last Name", size: "1/5" }}>
          <AppTextInput
            updateValue={(newValue) => {
              updatedUser.last_name = newValue;
            }}
          />
        </InputGroup>
        <InputGroup label={{ text: "Gender", size: "1/5" }}>
          <AppTextInput
            updateValue={(newValue) => {
              updatedUser.gender = newValue;
            }}
            secureTextEntry={true}
          />
        </InputGroup>

        <InputGroup label={{ text: "Date of Birth", size: "1/5" }}>
          <AppTextInput
            updateValue={(newValue) => {
              updatedUser.dob = new Date(newValue);
            }}
            secureTextEntry={true}
          />
        </InputGroup>

        <Button title="Create" onPress={handleCreateAccount}></Button>
      </View>
    </View>
  );
}

export default AccountUpadateScreen;
