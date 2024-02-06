import { useState } from "react";
import { Text, TextInput, SafeAreaView, Button } from "react-native";

function EventCreateScreen() {
    const [eventType, setEventType] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [eventLatitude, setEventLatitude] = useState(0)
    const [eventLongitude, setEventLongitude] = useState(0)
    const [eventDescription, setEventDescription] = useState("")

    const handleSubmit = () => {
        console.log("HANDLING SUBMIT");
        
    }

  return (
    <SafeAreaView>
      <Text style={{color: "blue"}}>EVENT CREATE SCREEN</Text>
      <TextInput 
        value={eventType}
        style={{backgroundColor: "black"}}
        placeholder="Please enter the type"
        keyboardType="ascii-capable"
        onChange={({nativeEvent: {text}}) => setEventType(text)}
        />
        <TextInput
        value={eventDate}
        style={{backgroundColor: "black"}}
        placeholder="Please enter date"
        keyboardType="ascii-capable"
        onChange={({nativeEvent: {text}}) => setEventDate(text)}
        />
        <TextInput
        value={eventLatitude.toLocaleString()}
        style={{backgroundColor: "black"}}
        placeholder="Please enter latitude"
        keyboardType="decimal-pad"
        onChange={({nativeEvent: {text}}) => setEventLatitude(parseInt(text))}
        />
        <TextInput
        value={eventLongitude.toLocaleString()}
        style={{backgroundColor: "black"}}
        placeholder="Please enter longitude"
        keyboardType="decimal-pad"
        onChange={({nativeEvent: {text}}) => setEventLongitude(parseInt(text))}
        />
        <TextInput
        value={eventDate}
        style={{backgroundColor: "black"}}
        placeholder="Please enter description"
        keyboardType="ascii-capable"
        onChange={({nativeEvent: {text}}) => setEventDescription(text)}
        />
        <Button 
            title="Submit"
            onPress={handleSubmit}
            
        />
    </SafeAreaView>
  );
}

export default EventCreateScreen;
