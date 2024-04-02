import { Text, View } from "react-native";
import AppDatePicker from "../components/AppDatePicker";
import AppForm from "../components/AppForm";
import AppFormField from "../components/AppFormField";
import App from "../App";
import AppDropdown from "../components/AppDropdown";

type FormFields = {
  startDate: Date;
  endDate: Date;
  radius: number;
};

type EventFilterFormProps = {
  onSubmit: (values: FormFields) => void;
};

export default function EventFilterForm({ onSubmit }: EventFilterFormProps) {
  return (
    <AppForm<FormFields> onSubmit={onSubmit}>
      <AppFormField<Date> name="startDate" initialValue={new Date()}>
        {({ value, setValue }) => (
          <View>
            <Text>Start Date</Text>
            <AppDatePicker
              mode="date"
              date={value}
              updateDate={(date) => setValue(date)}
            />
          </View>
        )}
      </AppFormField>

      <AppFormField<Date> name="endDate" initialValue={new Date()}>
        {({ value, setValue }) => (
          <View>
            <Text>End Date</Text>
            <AppDatePicker
              mode="date"
              date={value}
              updateDate={(date) => setValue(date)}
            />
          </View>
        )}
      </AppFormField>

      <AppFormField<number> name="radius" initialValue={0}>
        {({ setValue }) => (
          <View>
            <Text>Radius</Text>
            <AppDropdown<number>
              onChange={(meters) => setValue(meters)}
              data={[
                { label: "10 Miles", value: 16093.4 },
                { label: "25 Miles", value: 40233.6 },
                { label: "50 Miles", value: 80467.2 },
                { label: "100 Miles", value: 160934.4 },
                { label: "Any", value: 40075016 },
              ]}
            />
          </View>
        )}
      </AppFormField>
    </AppForm>
  );
}
