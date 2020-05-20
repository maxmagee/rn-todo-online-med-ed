/* eslint-disable global-require */
import React, { useState } from "react";
import { enableScreens } from "react-native-screens";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import RootNavigator from "./navigation/RootNavigator";

// Improves navigation performance
enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  }

  return <RootNavigator />;
}
