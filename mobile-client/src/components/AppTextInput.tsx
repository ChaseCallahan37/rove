import { TextInput, View } from "react-native";
import { style as tw } from "twrnc";

export type AppTextInputProps = {
  placeholder?: string;
  style?: string[];
  value?: string;
  updateValue: (updatedValue: string) => void;
};

function AppTextInput({
  value,
  updateValue,
  placeholder,
  style,
}: AppTextInputProps) {
  const handleOnChange = (text: string) => {
    updateValue(text);
  };

  return (
    <View style={tw(["flex-grow"].concat(style ? style : []))}>
      <TextInput
        style={tw(["bg-red-100"])}
        value={value}
        placeholder={placeholder ? placeholder : ""}
        keyboardType="ascii-capable"
        onChange={({ nativeEvent: { text } }) => handleOnChange(text)}
      />
    </View>
  );
}

export default AppTextInput;
