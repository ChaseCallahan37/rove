import { Form } from "houseform";
import { Button, View } from "react-native";

type AppFormProps<T> = {
  children: React.ReactNode[];
  onSubmit: (values: T) => void;
};

export default function AppForm<T>({ children, onSubmit }: AppFormProps<T>) {
  return (
    <Form<T> onSubmit={(values) => onSubmit(values)}>
      {({ isValid, submit }) => (
        <View>
          {children}
          <Button title="Submit" onPress={submit} disabled={!isValid} />
        </View>
      )}
    </Form>
  );
}
