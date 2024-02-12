import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Event } from "../api/events/event";

type EventListProps = {
  mapRef: React.MutableRefObject<null>;
  events: Event[] | null;
};

function EventList({ mapRef, events }: EventListProps) {
  if(!events || (events && events?.length == 0)){
    return <Text style={{color: "brown"}}>There are ne events to render</Text>
  }

  return (
    <FlatList
      data={events}
      numColumns={2}
      // @ts-ignore
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
              uri: "https://cdn.dribbble.com/users/1409624/screenshots/11850998/media/445dea8b45ff2bf796545364620bccd4.png?resize=400x300&vertical=center",
            }}
          />
          <Text style={styles.groupName}>Group Name</Text>
          <Text style={styles.members}>{title}</Text>
        </TouchableOpacity>
      )}
    />
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

export default EventList;
