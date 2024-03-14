import useApi from "./useApi";
import mapsApi from "../api/maps";
import { useRef } from "react";

export default function usePlaceSearch() {
  const {
    data: searchResults,
    loading: searchLoading,
    error: errorLoading,
    request: runSearch,
  } = useApi(mapsApi.searchPlaces);


  const searchGooglePlaces = async (query: string) => {
    await runSearch({query});

  };
  


  return { searchResults, searchLoading, errorLoading, searchGooglePlaces};
}
