import { Button, Text, View } from "react-native";
import useToggle from "../hooks/useToggle";
import DatePicker from "react-native-date-picker";
import format from "../utils/format";

type AppDatePickerProps = {
  date: Date;
  updateDate: (updatedDate: Date) => void;
};

function AppDatePicker({ date, updateDate }: AppDatePickerProps) {
  const { isToggled: showDatePicker, toggle: toggleDatePicker } = useToggle(false);
  return (
    <>
      <Button title={format.dateTime(date)} onPress={toggleDatePicker} />
      <DatePicker
        modal
        open={showDatePicker}
        date={new Date()}
        onConfirm={() => {
          toggleDatePicker();
          updateDate(date);
        }}
        onCancel={toggleDatePicker}
      />
</>
  );
}

export default AppDatePicker;
