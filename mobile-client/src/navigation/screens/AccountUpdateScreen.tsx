import { Alert, Button, Text, View } from "react-native";
import { style as tw } from "twrnc";

import { AppNavigationProp } from "../AppNavigations";
import AppTextInput from "../../components/AppTextInput";
import InputGroup from "../../components/InputGroup";
import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import userApi from "../../api/user";
import deepCopy from "../../utils/deepCopy";
import AppDatePicker from "../../components/AppDatePicker";
import { Account } from "../../api/account/account";
import { User } from "../../api/user/user";
import AppDropdown from "../../components/AppDropdown";

type AccountUpdateScreenProps = {
  navigation: AppNavigationProp<"AccountCreate">;
};

function AccountUpadateScreen({ navigation }: AccountUpdateScreenProps) {
  const { account, updateUser } = useAuth();

  if (!account?.user) return;

  const updatedUser = deepCopy<User>(account?.user);

  console.log("UPDATE");
  console.log(updatedUser);

  const handleCreateAccount = async () => {
    console.log("PAGE");
    console.log(updatedUser);

    const isSuccess = await updateUser(updatedUser);
    if (isSuccess) {
      Alert.alert("Profile Updated!");
      return navigation.navigate("Account");
    } else {
      Alert.alert("Failed to update account");
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
            defaultValue={updatedUser.first_name}
          />
        </InputGroup>
        <InputGroup label={{ text: "Last Name", size: "1/5" }}>
          <AppTextInput
            updateValue={(newValue) => {
              updatedUser.last_name = newValue;
            }}
            defaultValue={updatedUser.last_name}
          />
        </InputGroup>
        <InputGroup>
          <AppDropdown
            data={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
            onChange={(newGender) => (updatedUser.gender = newGender)}
          />
        </InputGroup>

        <InputGroup label={{ text: "Date of Birth", size: "1/5" }}>
          <AppDatePicker
            mode="date"
            date={updatedUser.dob}
            updateDate={(updatedDate) => (updatedUser.dob = updatedDate)}
          />
        </InputGroup>

        <Button title="Update" onPress={handleCreateAccount}></Button>
      </View>
    </View>
  );
}

export default AccountUpadateScreen;
