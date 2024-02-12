import { Text, View } from "react-native"
import { AppNavigationProp } from "../AppNavigations"

type EventDetailsScreenProps = {
    navigation: AppNavigationProp<"EventDetails">
}

function EventDetailsScreen(){
return (<View><Text>Event details screen</Text></View>)

}

export default EventDetailsScreen