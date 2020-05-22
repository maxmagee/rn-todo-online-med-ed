/* eslint-disable global-require */
import React, { useState } from "react";
import { enableScreens } from "react-native-screens";
import { AppLoading } from "expo";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import * as Font from "expo-font";
// TODO: composeWithDevTools should be removed before deploying to production
import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line

import RootNavigator from "./navigation/RootNavigator";

import tasksReducer from "./store/reducers/tasks";

// Improves navigation performance
enableScreens();

const rootReducer = combineReducers({
  tasks: tasksReducer,
});
const store = createStore(rootReducer, composeWithDevTools());

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

  return (
    <ActionSheetProvider>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </ActionSheetProvider>
  );
}
