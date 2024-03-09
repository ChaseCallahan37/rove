import { Button } from "react-native";
import useToggle from "../hooks/useToggle";
import DatePicker from "react-native-date-picker";
import format from "../utils/format";
import { useState } from "react";

type AppDatePickerProps = {
  date?: Date;
  updateDate: (updatedDate: Date) => void;
};

function AppDatePicker({ date: initialDate, updateDate }: AppDatePickerProps) {
  const [date, setDate] = useState<Date>(initialDate ? new Date(initialDate) : new Date())

  const { isToggled: showDatePicker, toggle: toggleDatePicker } =
    useToggle(false);

    console.log("DATE PICKER");
    
    console.log(date);

    console.log(typeof date);
    
    

  const handleOnConfirm = (date: Date) => {
    setDate(date)
    updateDate(date);
    toggleDatePicker();
  };
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
