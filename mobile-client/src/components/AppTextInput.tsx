import { TextInput, View } from "react-native"

type AppTextInputProps = {
    placeholder? : string,
    value?: string,
    updateValue: (updatedValue: string) => void
}

function AppTextInput({value, updateValue, placeholder}: AppTextInputProps){
    
    const handleOnChange = (text: string) => {
        updateValue(text)
    }

    return  <View style={{backgroundColor: "grey"}}><TextInput
    value={value}
    placeholder={placeholder ? placeholder : ""}
    keyboardType="ascii-capable"
    onChange={({ nativeEvent: { text } }) =>
        handleOnChange(text)
    }
  />
  </View>
}

export default AppTextInput