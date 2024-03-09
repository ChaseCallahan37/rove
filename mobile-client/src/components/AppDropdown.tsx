import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { style as tw } from "twrnc";

type AppDropdownProps = {
  data: { label: string; value: string }[];
  onChange: (value: string) => void;
};

export default function AppDropdown({ data, onChange }: AppDropdownProps) {
  const handleOnChange = ({ value }: { label: string; value: string }) => {
    onChange(value);
  };

  return (
    <View style={tw(["flex-grow", "text-black"])}>
      <Dropdown
        data={data}
        labelField={"label"}
        valueField={"value"}
        onChange={handleOnChange}
        itemTextStyle={tw(["text-black"])}
      />
    </View>
  );
}
