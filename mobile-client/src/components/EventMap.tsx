import { PropsWithChildren } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import eventApi from "../api/events";

type SectionProps = PropsWithChildren<{
}>;

function EventMap(): React.JSX.Element {
  const events = eventApi.retrieveEvents();
  console.log(events);
 return <View style={{flex: 1}}>
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
         <ScrollView>
          <Text>NEARBY</Text>
        
         <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-around", marginBottom: 15}}>       
        {events.map(({title}, index) => 

            <View key={index} style={styles.card}>
               <TouchableOpacity style={styles.joinButton} >
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>
      <Image style={styles.imagePlaceholder} source={{ uri: "/home/chase/projects/professional/rove/mobile-client/assets/generic_event.webp" }} />
      <Text style={styles.groupName}>Group Name</Text>
      <Text style={styles.members}>Members members</Text>
            </View>
       )}

 </View>

        </ScrollView> 
    </View> 
  
}

const styles = StyleSheet.create({
    joinButton: {
        alignSelf: "flex-start",
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 4
    },


    joinButtonText: {
        color: 'white',
      },
      imagePlaceholder: {
        backgroundColor: '#bdc3c7',
        height: 150, // Adjust the height as needed
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
      },
      groupInfo: {
        alignItems: 'center',
      },
      groupName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      members: {
        fontSize: 16,
      },
    card: {
        width: "45%",
        backgroundColor: '#d6f5d6', // This is a placeholder color
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 3, // Adds a subtle shadow on Android
        shadowOpacity: 0.1, // Adds a subtle shadow on iOS
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        marginBottom: 10
      },
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
      height: 450, // You can adjust this value as needed
      width: '100%',
  },
  eventList: {
      // Flex to fill the remaining space after the map
      flex: 1,
  },
  // Add more styles if needed
});

export default EventMap 