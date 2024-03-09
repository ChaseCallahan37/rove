import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { style as tw } from "twrnc";

import useToggle from "../hooks/useToggle";

export type AppTextInputProps = {
  placeholder?: string;
  style?: string[];
  value?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean;
  updateValue: (updatedValue: string) => void;
  defaultValue?: string;
};

function AppTextInput({
  value,
  updateValue,
  placeholder,
  style,
  keyboardType,
  secureTextEntry,
  defaultValue,
}: AppTextInputProps) {
  const { isToggled, toggle } = useToggle(!!secureTextEntry);

  const handleOnChange = (text: string) => {
    updateValue(text);
  };

  return (
    <View style={tw(["flex-grow"].concat(style ? style : []))}>
      <TextInput
        style={tw(["bg-red-100"])}
        value={value}
        placeholder={placeholder ? placeholder : ""}
        keyboardType={keyboardType}
        secureTextEntry={isToggled}
        onChange={({ nativeEvent: { text } }) => handleOnChange(text)}
        defaultValue={defaultValue}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => toggle()}>
          <Text>Show/Hide Password</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default AppTextInput;
