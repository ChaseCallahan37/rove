import { TextInput, View } from "react-native";

type AppNumberInputProps = {
  value?: number;
  updateValue: (updatedValue: number) => void;
  placeholder?: string;
};

function AppNumberInput({
  value,
  updateValue,
  placeholder,
}: AppNumberInputProps) {
  const handleOnChange = (text: string) => {
    updateValue(parseFloat(text));
  };

  return (
    <View style={{ backgroundColor: "grey" }}>
      <TextInput
        // We want to render an empty string, in order to keep the UI clean
        value={value ? value.toLocaleString() : ""}
        // We want the consumer to have the option to provide a placeholder
        placeholder={placeholder ? placeholder : ""}
        keyboardType="decimal-pad"
        onChange={({ nativeEvent: { text } }) => handleOnChange(text)}
      />
    </View>
  );
}

export default AppNumberInput;
