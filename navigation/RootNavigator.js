import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import ActiveToDoListScreen from "../screens/ActiveToDoListScreen";
import CompletedToDoListScreen from "../screens/CompletedToDoListScreen";
import CreateToDoScreen from "../screens/CreateToDoScreen";
import EditToDoScreen from "../screens/EditToDoScreen";

const defaultNavigationOptions = {};

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
    initialRouteName: "Active",
    order: ["Active", "Completed"],
  }
);

export default createAppContainer(RootNavigator);
