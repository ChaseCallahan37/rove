import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { style as tw } from "twrnc";

type AppDropdownProps<T> = {
  data: { label: string; value: T }[] | null | undefined;
  onChange: (value: T) => void;
};

export default function AppDropdown<T>({
  data,
  onChange,
}: AppDropdownProps<T>) {
  const handleOnChange = ({ value }: { label: string; value: T }) => {
    onChange(value);
  };

  return (
    <View style={tw(["flex-grow", "text-black"])}>
      {!data ? (
        <Text style={tw(["text-black"])}>Loading</Text>
      ) : (
        <Dropdown
          data={data}
          labelField={"label"}
          valueField={"value"}
          onChange={handleOnChange}
          itemTextStyle={tw(["text-black"])}
        />
      )}
    </View>
  );
}
