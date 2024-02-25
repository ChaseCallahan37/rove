import { View, Text, Button } from "react-native";
import { AppNavigationProp } from "../AppNavigations";
import useAuth from "../../hooks/useAuth";
import AppPillContainer from "../../components/AppPillContainer";

type AccountScreenProps = {
  navigation: AppNavigationProp<"Account">;
};

export default function AccountScreen({ navigation }: AccountScreenProps) {
  const { user, signOut } = useAuth();
  return (
    <View>
      <AppPillContainer>{user && <Text>{user.email}</Text>}</AppPillContainer>
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
