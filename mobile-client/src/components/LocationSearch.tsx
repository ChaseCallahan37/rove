import { Button, Text, TouchableOpacity, View } from "react-native";
import { style as tw } from "twrnc";

import { Place } from "../api/maps/map";
import useApi from "../hooks/useApi";
import mapsApi from "../api/maps";
import AppTextInput from "./AppTextInput";

type LocationSearchProps = {
  onLocationSelect?: (place: Place) => void;
};

export default function LocationSearch({
  onLocationSelect,
}: LocationSearchProps) {
  const { data: searchedPlaces, request: searchGooglePlaces, loading: searchLoading } = useApi(
    mapsApi.searchPlaces
  );

  let placeSearch = "";

  const handleOnSearch = () => {
    searchGooglePlaces({ query: placeSearch });
  };

  return (
    <View style={tw(["p-2"])}>
      <AppTextInput
        placeholder="Type the name of the location"
        updateValue={(text) => (placeSearch = text)}
      />
      {searchedPlaces?.map((place, index) => (
        <TouchableOpacity
          onPress={onLocationSelect && (() => onLocationSelect(place))}
          style={tw(["bg-slate-500", "mb-2"])}
          key={index}
        >
          <Text style={tw(["text-black", "text-lg"])}>{place.name}</Text>
        </TouchableOpacity>
      ))}
      {!searchLoading ? <Button title="Search" onPress={handleOnSearch} /> : <Text style={tw(['text-black'])}>Loading</Text>}
    </View>
  );
}
