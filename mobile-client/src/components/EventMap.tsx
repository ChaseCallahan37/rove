import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

type SectionProps = PropsWithChildren<{
}>;

function EventMap(): React.JSX.Element {
    return (
      <View >
        <Text style={styles.text}>Map Component</Text>
        
      </View>
    );
  }

  const styles = StyleSheet.create({
    text: {
      color: "white"
    } 
  });

  export default EventMap 