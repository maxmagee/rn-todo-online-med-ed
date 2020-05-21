import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import ActiveToDoListScreen from "../screens/ActiveToDoListScreen";
import CompletedToDoListScreen from "../screens/CompletedToDoListScreen";
import CreateToDoScreen from "../screens/CreateToDoScreen";
import EditToDoScreen from "../screens/EditToDoScreen";

import colors from "../constants/colors";

const defaultNavigationOptions = {
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerStyle: {
    backgroundColor: colors.dark.systemGray5,
    shadowColor: "transparent",
  },
  headerTintColor: colors.dark.lightGray,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
};

const ActiveToDosNavigator = createStackNavigator(
  {
    ActiveToDoList: ActiveToDoListScreen,
    CreateToDo: CreateToDoScreen,
    EditToDo: EditToDoScreen,
  },
  {
    defaultNavigationOptions,
    initialRouteName: "ActiveToDoList",
  }
);

const CompletedToDosNavigator = createStackNavigator(
  {
    CompletedToDos: CompletedToDoListScreen,
  },
  {
    defaultNavigationOptions,
    initialRouteName: "CompletedToDos",
  }
);

const RootNavigator = createDrawerNavigator(
  {
    Active: ActiveToDosNavigator,
    Completed: CompletedToDosNavigator,
  },
  {
    contentOptions: {
      activeBackgroundColor: colors.dark.systemGray5,
      activeTintColor: colors.dark.blue,
      inactiveBackgroundColor: colors.dark.systemGray5,
      inactiveTintColor: colors.dark.lightGray,
    },
    drawerBackgroundColor: colors.dark.systemGray5,
    drawerWidth: 200,
    initialRouteName: "Active",
    order: ["Active", "Completed"],
  }
);

export default createAppContainer(RootNavigator);
