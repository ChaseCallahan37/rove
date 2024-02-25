import { View, Text } from "react-native";
import { AppNavigationProp } from "../AppNavigations";
import useAuth from "../../hooks/useAuth";
import AppPillContainer from "../../components/AppPillContainer";

type AccountScreenProps = {
  navigation: AppNavigationProp<"Account">;
};

export default function AccountScreen({ navigation }: AccountScreenProps) {
  const {user} = useAuth()
  return (
    <View>
    <AppPillContainer>
        <Text>{user.email}</Text>
    </AppPillContainer>
    </View>
  );
}
