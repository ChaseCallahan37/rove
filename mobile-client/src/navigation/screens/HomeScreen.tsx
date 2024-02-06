import { Button, Text, View } from "react-native";
import { routes } from "../AppNavigations";

// @ts-ignore
function HomeScreen({navigation}) {
    return (
        <View>
            <Text style={{color: "blue"}}>Home Screen</Text>
            <Button 
                title="Go To Events"
                onPress={() => navigation.navigate(routes.eventMap)}
            />
        </View>
    )
}

export default HomeScreen