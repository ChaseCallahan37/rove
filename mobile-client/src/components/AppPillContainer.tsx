import { View } from "react-native";
import { style as tw } from "twrnc";

type AppPillContainerProps = {
  style?: string[];
  children: React.ReactNode;
};

export default function AppPillContainer({
  children,
  style,
}: AppPillContainerProps) {
  return (
    <View
      style={tw(
        [
          "bg-sky-200",
          "rounded-full",
          "p-2",
          "flex",
          "flex-row",
          "items-center",
          "justify-around",
        ].concat(style ? style : [])
      )}
    >
      {children}
    </View>
  );
}
