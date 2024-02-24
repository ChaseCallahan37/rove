import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { style as tw } from "twrnc";
import AppPillContainer from "./AppPillContainer";

type InputGroupProps = {
  label?: {
    text: string;
    size: "1/5" | "2/5" | "3/5";
  };
  style?: string[];
  children: React.ReactNode;
};

function InputGroup({ label, children, style }: InputGroupProps) {
  return (
    <View>
      {label && (
        <View style={tw(["pl-6", "mb-1"])}>
          <Text style={tw(["text-slate-400", "flex-grow"])}>{label.text}</Text>
        </View>
      )}

      <AppPillContainer
        style={["flex", "flex-row", "px-6", "mb-8"].concat(style ? style : [])}
      >
        {children}
      </AppPillContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
  },
});

export default InputGroup;
