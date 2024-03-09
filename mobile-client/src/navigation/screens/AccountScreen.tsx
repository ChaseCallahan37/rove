import { View, Text, Button, TouchableOpacity } from "react-native";
import { style as tw } from "twrnc";

import { AppNavigationProp } from "../AppNavigations";
import useAuth from "../../hooks/useAuth";
import AppPillContainer from "../../components/AppPillContainer";
import AppTextInput from "../../components/AppTextInput";
import format from "../../utils/format";

type AccountScreenProps = {
  navigation: AppNavigationProp<"Account">;
};

export default function AccountScreen({ navigation }: AccountScreenProps) {
  const { account, signOut } = useAuth();
  console.log(typeof account?.user?.dob);
  
  return (
    <View>
      <View style={tw(["bg-slate-500", "p-2"])}>
        <View style={tw(["flex", "flex-row", "justify-between"])}>
          <Text>Account Info</Text>
          <TouchableOpacity onPress={() => navigation.navigate("AccountUpdate")}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>

        <Text>Email: {account?.email}</Text>
        <Text>First: {account?.user?.first_name}</Text>
        <Text>Last: {account?.user?.last_name}</Text>
        <Text>
          DOB: {account?.user?.dob && format.shortDate(account?.user?.dob)}
        </Text>
        <Text>Gender: {account?.user?.gender} </Text>
      </View>

      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}
