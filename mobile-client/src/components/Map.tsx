import { PropsWithChildren } from "react";
import { Text, View } from "react-native";

type SectionProps = PropsWithChildren<{
    title: string
}>;

function Map({title}: SectionProps): React.JSX.Element {
    return (
      <View >
        <Text>Map Component</Text>
        <Text
          >
        </Text>
      </View>
    );
  }