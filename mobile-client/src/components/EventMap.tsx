import { PropsWithChildren, useEffect, useRef } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import eventApi from "../api/events";
import useApi from "../hooks/useApi";


function EventMap(): React.JSX.Element {
  const {
    data: events,
    request: getEvents,
    loading,
    error,
  } = useApi(eventApi.retrieveEvents);

  // @ts-ignore
  useEffect(() => {
    getEvents();
  }, []);

  const mapRef = useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 33.2098,
          longitude: -87.5692,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {events &&
          /*@ts-ignore          */
          events.map(({ latitude, longitude }, index) => (
            <Marker key={index} coordinate={{ latitude, longitude }} />
          ))}
      </MapView>
      <Text>NEARBY</Text>

      {/*@ts-ignore          */}
      <FlatList
        data={events}
        numColumns={2} // Adjust the number of columns as needed
        renderItem={({ item: { latitude, longitude, title } }) => (
          <TouchableOpacity
            onPress={() => {
              if (!mapRef) return null;
              // @ts-ignore
              mapRef.current.animateToRegion(
                {
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                },
                1000
              );
            }}
            style={styles.card}
          >
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
            <Image
              style={styles.imagePlaceholder}
              source={{
                uri: "./assets/generic_event.webp",
              }}
            />
            <Text style={styles.groupName}>Group Name</Text>
            <Text style={styles.members}>{title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  joinButton: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
  },

  joinButtonText: {
    color: "white",
  },
  imagePlaceholder: {
    backgroundColor: "#bdc3c7",
    height: 150, // Adjust the height as needed
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  groupInfo: {
    alignItems: "center",
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  members: {
    fontSize: 16,
  },
  card: {
    width: "45%",
    backgroundColor: "#d6f5d6", // This is a placeholder color
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3, // Adds a subtle shadow on Android
    shadowOpacity: 0.1, // Adds a subtle shadow on iOS
    shadowRadius: 4,
    shadowColor: "#000",
    shadowOffset: { height: 2, width: 0 },
    marginBottom: 10,
    margin: "2.5%",
  },
  text: {
    color: "white",
    // Add more styling for your text as needed
  },
  container: {
    // Fill the entire screen
    flex: 1,
  },
  map: {
    // Specify the height of the map or use flex to allocate space
    height: 450, // You can adjust this value as needed
    width: "100%",
  },
  eventList: {
    // Flex to fill the remaining space after the map
    flex: 1,
  },
  // Add more styles if needed
});

export default EventMap;
