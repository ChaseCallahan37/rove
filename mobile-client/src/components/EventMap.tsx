import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import eventApi from "../api/events";

type SectionProps = PropsWithChildren<{
}>;

function EventMap(): React.JSX.Element {
  const events = eventApi.retrieveEvents();
  console.log(events);
 return <View>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              region={{
                  latitude: 33.2098,
                  longitude: -87.5692,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
              }}
            >
              {events.map(({coordinate}, index) => 
                  <Marker 
                      key={index}
                      coordinate={coordinate}
                  />
              )}
          </MapView>
        {events.map(({title}, index) => 
                  <Text style={styles.text} key={index}>{title}</Text>
              )}
    </View> 
  
}

const styles = StyleSheet.create({
  text: {
      color: "white"
      // Add more styling for your text as needed
  },
  container: {
      // Fill the entire screen
      flex: 1,
  },
  map: {
      // Specify the height of the map or use flex to allocate space
      height: 500, // You can adjust this value as needed
      width: '100%',
  },
  eventList: {
      // Flex to fill the remaining space after the map
      flex: 1,
  },
  // Add more styles if needed
});

export default EventMap 