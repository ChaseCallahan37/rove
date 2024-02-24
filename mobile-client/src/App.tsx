import React from "react";
import { enableLatestRenderer } from "react-native-maps";
import tw, { useDeviceContext } from "twrnc";

import AppNavigation from "./navigation/AppNavigations";
import AuthContext from "./auth/context";
import AuthWrapper from "./components/AuthWrapper";

// We do this to allow the react-native-maps library to properly render
// the most recent and up to date version of maps.
enableLatestRenderer();

function App(): React.JSX.Element {
  useDeviceContext(tw);

  return (
    <AuthWrapper>
      <AppNavigation />
    </AuthWrapper>
  );
}

export default App;
