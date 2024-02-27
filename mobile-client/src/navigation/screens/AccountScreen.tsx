import { View, Text, Button } from "react-native";
import { AppNavigationProp } from "../AppNavigations";
import useAuth from "../../hooks/useAuth";
import AppPillContainer from "../../components/AppPillContainer";

type AccountScreenProps = {
  navigation: AppNavigationProp<"Account">;
};

export default function AccountScreen({ navigation }: AccountScreenProps) {
  const { account, signOut } = useAuth();
  return (
    <View>
      <AppPillContainer>
        {account && <Text>{account.email}</Text>}
      </AppPillContainer>
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
