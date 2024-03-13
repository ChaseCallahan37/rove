import { forwardRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, {
  ClickEvent,
  LongPressEvent,
  MapPressEvent,
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
} from "react-native-maps";

export type Pin = {
  id?: string;
  name?: string;
  address?: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
};

type AppEventMapProps = {
  pins?: Pin[] | undefined;
  onPress?: (coordinate: { latitude: number; longitude: number }) => void;
  onLongPress?: (coordinate: { latitude: number; longitude: number }) => void;
  onDoublePress?: (coordinate: { latitude: number; longitude: number }) => void;
  onPinPress?: (pin: Pin) => void;
};

// We use forward ref here so that we can pass the reference down to the
// MapView component, allowing us to effectively encapsulate our map dependency
const AppMapView = forwardRef(
  (
    { pins, onPress, onDoublePress, onLongPress, onPinPress }: AppEventMapProps,
    ref
  ) => {
    const handleOnPress = (event: MapPressEvent) => {
      if (!onPress) {
        throw new Error("Must provide onPress field in order to use it");
      }

      const { coordinate } = event.nativeEvent;
      onPress(coordinate);
    };

    const handleOnLongPress = (event: LongPressEvent) => {
      if (!onLongPress) {
        throw new Error("Must provide onLongPress field in order to use it");
      }
      const { coordinate } = event.nativeEvent;
      onLongPress(coordinate);
    };

    const handleDoublePress = (event: ClickEvent) => {
      if (!onDoublePress) {
        throw new Error("Must provide onDoublePress field in order to use it");
      }
      const { coordinate } = event.nativeEvent;
      onDoublePress(coordinate);
    };

    return (
      <View style={{}}>
        <MapView
          // @ts-ignore
          ref={ref}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          onPress={onPress && handleOnPress}
          onLongPress={onLongPress && handleOnLongPress}
          onDoublePress={onDoublePress && handleDoublePress}
          region={{
            latitude: 33.2098,
            longitude: -87.5692,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {pins &&
            /*@ts-ignore          */
            pins.map((pin, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: pin.latitude,
                  longitude: pin.longitude,
                }}
                onPress={onPinPress && ((event) => onPinPress(pin))}
                image={{
                  uri: pin.imageUrl
                    ? pin.imageUrl
                    : "data:image/webp;base64,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",
                }}
              />
            ))}
        </MapView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  map: {
    // Specify the height of the map or use flex to allocate space
    height: 250, // You can adjust this value as needed
    width: "100%",
  },
});

export default AppMapView;
