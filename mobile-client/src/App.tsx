import React from "react";
import { enableLatestRenderer } from "react-native-maps";

import AppNavigation from "./navigation/AppNavigations";

// We do this to allow the react-native-maps library to properly render
// the most recent and up to date version of maps.
enableLatestRenderer();

function App(): React.JSX.Element {
  return (
   <AppNavigation /> 
  );
}

export default App;
