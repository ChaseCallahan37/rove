import { Form } from "houseform";
import React from "react";
import {
  Button,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type AppFormProps<T> = {
  children: React.ReactNode[] | React.ReactNode;
  onSubmit: (values: T) => void;
};

export default function AppForm<T>({ children, onSubmit }: AppFormProps<T>) {
  return (
    <Form<T> onSubmit={(values) => onSubmit(values)}>
      {({ isValid, submit }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            {children}
            <Button title="Submit" onPress={submit} disabled={!isValid} />
          </View>
        </TouchableWithoutFeedback>
      )}
    </Form>
  );
}
