import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";

type SectionProps = PropsWithChildren<{
}>;


const events  = [{
  coordinate: {latitude: 33.2098,
  longitude: -87.5692} 
},
{
  coordinate: {latitude: 33.2325,
  longitude: -87.5211} 
},{
  coordinate: {latitude: 33.2341,
  longitude: -87.5331} 
},{
  coordinate: {latitude: 33.2433,
  longitude: -87.5909} 
},
]

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
      {events.map(({coordinate}, index) => 
        <Marker 
        key={index}
          coordinate={coordinate}
        />)}
      <Marker 
        coordinate={{
         latitude: 33.2098,
         longitude: -87.5692 
        }}
      />
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