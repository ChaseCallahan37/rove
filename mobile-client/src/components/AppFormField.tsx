import { Field } from "houseform";
import { Children } from "react";
import { Text, View } from "react-native";

type AppFormFieldProps<T> = {
  children: (props: {
    value: T;
    setValue: (param: T) => void;
  }) => React.ReactNode;
  name: string;
  initialValue: T;
};

export default function AppFormField<T>({
  children,
  initialValue,
  name,
}: AppFormFieldProps<T>) {
  return (
    <View>
      <Field<T> name={name} initialValue={initialValue}>
        {({ errors, value, setValue }) => (
          <View>
            {children({ value, setValue })}
            {errors.map((err, i) => (
              <Text key={i}>{err}</Text>
            ))}
          </View>
        )}
      </Field>
    </View>
  );
}
