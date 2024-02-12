import { forwardRef } from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import MapView, { ClickEvent, LongPressEvent, MapPressEvent, Marker, PROVIDER_GOOGLE } from "react-native-maps";

type AppEventMapProps = {
  pins?: { latitude: number; longitude: number }[] | undefined;
  onPress?: (coordinate: {latitude: number, longitude: number}) => void
  onLongPress?: (coordinate: {latitude: number, longitude: number}) => void
  onDoublePress?: (coordinate: {latitude: number, longitude: number}) => void
};

// We use forward ref here so that we can pass the reference down to the
// MapView component, allowing us to effectively encapsulate our map dependency
const AppMapView = forwardRef(({ pins, onPress, onDoublePress, onLongPress}: AppEventMapProps, ref) => {

  const handleOnPress = (event: MapPressEvent) => {
    if(!onPress){
      throw new Error("Must provide onPress field in order to use it")
    }
    
    const {coordinate} = event.nativeEvent
    onPress(coordinate)
  }

  const handleOnLongPress = (event: LongPressEvent) => {
    if(!onLongPress){
      throw new Error("Must provide onLongPress field in order to use it")
    }
    const {coordinate} = event.nativeEvent
    onLongPress(coordinate)
  }

  const handleDoublePress = (event: ClickEvent) => {
    if(!onDoublePress){
      throw new Error("Must provide onDoublePress field in order to use it")
    }
    const {coordinate} = event.nativeEvent
    onDoublePress(coordinate)
  }

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
