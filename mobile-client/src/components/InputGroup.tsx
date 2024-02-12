import { StyleSheet, Text, View } from "react-native";
import React from "react";

type InputGroupProps = {
  label?: {
    text: string;
    size: "sm" | "md" | "lg";
  };
  children: React.ReactNode;
};

function InputGroup({ label, children }: InputGroupProps) {
  return (
    <View style={styles.container}>
      {label && <Text>{label.text}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
  },
});

export default InputGroup;
