import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { style as tw } from "twrnc";

import { Place, searchPlaces } from "../api/maps/map";
import useApi from "../hooks/useApi";
import mapsApi from "../api/maps";
import AppTextInput from "./AppTextInput";
import { useRef } from "react";

type LocationSearchProps<T> = {
  searchedItems: T[] | null | undefined
  loading: boolean
  onItemSelect?: (place: T) => void;
  onSearch: (text: string) => void;
};

export default function LocationSearch<T extends {name: string}>({
  onItemSelect,
  searchedItems,
  onSearch,
  loading
}: LocationSearchProps<T>) {
  
  const searchQuery = useRef("");

  const handleOnSearch = () => {
    onSearch(searchQuery.current)
  };

  return (
    <View style={tw(["p-2"])}>
      <AppTextInput
        placeholder="Type the name of the location"
        updateValue={(text) => (searchQuery.current = text)}
      />
      {searchedItems && (
        <ScrollView
          style={tw(["max-h-40", "bg-fuchsia-300"])}
          nestedScrollEnabled={true}
        >
          {searchedItems?.map((item, index) => (
            <TouchableOpacity
              onPress={onItemSelect && (() => onItemSelect(item))}
              style={tw(["bg-slate-500", "mb-2"])}
              key={index}
            >
              <Text style={tw(["text-black", "text-lg"])}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {!loading ? (
        <Button title="Search" onPress={handleOnSearch} />
      ) : (
        <Text style={tw(["text-black"])}>Loading</Text>
      )}
    </View>
  );
}
