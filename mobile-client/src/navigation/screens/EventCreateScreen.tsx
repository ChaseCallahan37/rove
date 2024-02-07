import { useState } from "react";
import { Text, TextInput, SafeAreaView, Button } from "react-native";
import DatePicker from "react-native-date-picker"
import useApi from "../../hooks/useApi";
import { Event, createEvent } from "../../api/events/event";

function EventCreateScreen() {
    const [eventType, setEventType] = useState("")
    const [eventDate, setEventDate] = useState(new Date())
    const [eventLatitude, setEventLatitude] = useState(0)
    const [eventLongitude, setEventLongitude] = useState(0)
    const [eventDescription, setEventDescription] = useState("")

    const [open, setOpen] = useState(false)
    const {request} = useApi(createEvent)
    
    const handleSubmit = () => {
      const myEvent: Event = {
       date: eventDate,
        latitude: eventLatitude,
        longitude: eventLongitude,
        title: eventDescription 
      }
      
      console.log(myEvent);
        
      
      request(myEvent)   
        
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
        <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={eventDate}
        onConfirm={(date) => {
          setOpen(false)
          setEventDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
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
        <Button 
            title="Submit"
            onPress={handleSubmit}
            
        />
    </SafeAreaView>
  );
}

export default EventCreateScreen;
