import { Button, Text, View } from "react-native";
import useToggle from "../hooks/useToggle";
import DatePicker from "react-native-date-picker";
import format from "../utils/format";
import { setDate } from "date-fns";

type AppDatePickerProps = {
  date: Date;
  updateDate: (updatedDate: Date) => void;
};

function AppDatePicker({ date, updateDate }: AppDatePickerProps) {
  const { isToggled: showDatePicker, toggle: toggleDatePicker } =
    useToggle(false);

    const handleOnConfirm = (date: Date) => {
      updateDate(date)
      toggleDatePicker()
    } 
  return (
    <>
      <Button title={format.dateTime(date)} onPress={toggleDatePicker} />
      <DatePicker
        modal
        open={showDatePicker}
        date={date}
        onConfirm={handleOnConfirm}
        onCancel={toggleDatePicker}
      />
    </>
  );
}

export default AppDatePicker;
