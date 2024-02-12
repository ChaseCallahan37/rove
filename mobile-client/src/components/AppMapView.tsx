import { forwardRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

type AppEventMapProps = {
  pins?: { latitude: number; longitude: number }[];
};

// We use forward ref here so that we can pass the reference down to the
// MapView component, allowing us to effectively encapsulate our map dependency
const AppMapView = forwardRef(({ pins }: AppEventMapProps, ref) => {
  return (
    <View style={{}}>
      <MapView
        // @ts-ignore
        ref={ref}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 33.2098,
          longitude: -87.5692,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {pins &&
          /*@ts-ignore          */
          pins.map(({ latitude, longitude }, index) => (
            <Marker key={index} coordinate={{ latitude, longitude }} />
          ))}
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  map: {
    // Specify the height of the map or use flex to allocate space
    height: 380, // You can adjust this value as needed
    width: "100%",
  },
});

export default AppMapView;
