import React from "react";
import { enableScreens } from "react-native-screens";

import RootNavigator from "./navigation/RootNavigator";

// Improves navigation performance
enableScreens();

export default function App() {
  return <RootNavigator />;
}
