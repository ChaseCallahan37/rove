import { View } from "react-native";
import AppForm from "../components/AppForm";
import AppFormField from "../components/AppFormField";
import AppLabel from "../components/AppLabel";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

type FormFields = {
  email: string;
  username: string;
  password: string;
  rePassword: string;
};

type CreateAccountFormProps = {
  onSubmit: (values: FormFields) => void;
};

export default function AccountCreateForm({ onSubmit }: CreateAccountFormProps) {

  const handleOnSubmit = (formFields: FormFields) => {

  }

  return (
    <AppForm<FormFields> onSubmit={onSubmit} >
      {({submit}) =>(
        <View>

      <AppFormField<string> name="email">
        {({ value: email, setValue: setEmail }) => (
          <View>
            <AppLabel>Email</AppLabel>
            <AppTextInput value={email} updateValue={setEmail} />
          </View>
        )}
      </AppFormField>
      <AppFormField<string> name="username">
        {({ value: username, setValue: setUsername }) => (
          <View>
            <AppLabel>Username</AppLabel>
            <AppTextInput value={username} updateValue={setUsername} />
          </View>
        )}
      </AppFormField>
      <AppFormField<string> name="password">
        {({ value: password, setValue: setPassword }) => (
          <View>
            <AppLabel>Password</AppLabel>
            <AppTextInput value={password} updateValue={setPassword} />
          </View>
        )}
      </AppFormField>

      <AppFormField<string> name="rePassword">
        {({ value: rePassword, setValue: setRePassword }) => (
          <View>
            <AppLabel>rePassword</AppLabel>
            <AppTextInput value={rePassword} updateValue={setRePassword} />
          </View>
        )}
      </AppFormField>

      <AppButton onPress={submit}>Create Account</AppButton>

        </View>
      )}
      

    </AppForm>
  );
}
