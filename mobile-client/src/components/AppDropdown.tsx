import { Dropdown } from "react-native-element-dropdown";

type AppDropdownProps = {
  data: { label: string; value: string }[];
  onChange: (value: string) => void;
  valueField: "value" | "label";
  labelField: "value" | "label";
};

export default function AppDropdown({
  data,
  onChange,
  labelField,
  valueField,
}: AppDropdownProps) {
  const handleOnChange = ({ value }: { label: string; value: string }) => {
    onChange(value);
  };

  return (
    <Dropdown
      data={data}
      labelField={labelField}
      valueField={valueField}
      onChange={handleOnChange}
    />
  );
}
