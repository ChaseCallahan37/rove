import { Button } from "react-native";
import useToggle from "../hooks/useToggle";
import DatePicker from "react-native-date-picker";
import format from "../utils/format";
import { useState } from "react";

type AppDatePickerProps = {
  date?: Date;
  updateDate: (updatedDate: Date) => void;
  mode: "datetime" | "date" | "time";
};

function AppDatePicker({
  date: initialDate,
  updateDate,
  mode,
}: AppDatePickerProps) {
  const [date, setDate] = useState<Date>(
    initialDate ? new Date(initialDate) : new Date()
  );

  const { isToggled: showDatePicker, toggle: toggleDatePicker } =
    useToggle(false);

  const handleOnConfirm = (date: Date) => {
    setDate(date);
    updateDate(date);
    toggleDatePicker();
  };
  return (
    <>
      <Button title={format.dateTime(date)} onPress={toggleDatePicker} />
      <DatePicker
        modal
        mode={mode}
        open={showDatePicker}
        date={date}
        onConfirm={handleOnConfirm}
        onCancel={toggleDatePicker}
      />
    </>
  );
}

export default AppDatePicker;
