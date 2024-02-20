import { View, Text } from "react-native";
import { style as tw } from "twrnc";

function LoadingSpinner() {
  return (
    <View style={tw(["text-slate-400", "animate-spin", "h-5", "w-5", "mr-3"])}>
      <Text style={tw(["text-slate-400"])}>Loading </Text>
    </View>
  );
}

export default LoadingSpinner;
