import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";

type SectionProps = PropsWithChildren<{
}>;

function EventMap(): React.JSX.Element {
    return (
      <View style={styles.container}>
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
     </MapView>
   </View>
    );
  }

  const styles = StyleSheet.create({
    text: {
      color: "white"
    },
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });

  export default EventMap 