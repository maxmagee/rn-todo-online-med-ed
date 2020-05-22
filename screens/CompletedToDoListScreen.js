import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "react-navigation-drawer";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { connectActionSheet, useActionSheet } from "@expo/react-native-action-sheet";

import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import DefaultText from "../components/ui/DefaultText";
import TaskListItem from "../components/task/TaskListItem";

import colors from "../constants/colors";
import types from "../constants/types";
import * as taskActions from "../store/actions/tasks";

const CompletedToDoListScreen = (props) => {
  const { navigation } = props;
  const { showActionSheetWithOptions } = useActionSheet();
  const completedTasks = useSelector((state) => state.tasks.completedTasks);
  const dispatch = useDispatch();

  const openSortSheetHandler = useCallback(() => {
    const options = [
      "Oldest Completion",
      "Newest Completion",
      "Highest Priority",
      "Lowest Priority",
      "Cancel",
    ];
    const cancelButtonIndex = 4;

    showActionSheetWithOptions(
      {
        cancelButtonIndex,
        options,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            dispatch(taskActions.sortTasks(types.sort.byDateCompletedAsc, false));
            break;
          case 1:
            dispatch(taskActions.sortTasks(types.sort.byDateCompletedDesc, false));
            break;
          case 2:
            dispatch(taskActions.sortTasks(types.sort.byPriorityDesc, false));
            break;
          case 3:
            dispatch(taskActions.sortTasks(types.sort.byPriorityAsc, false));
            break;
          default:
            break;
        }
      }
    );
  }, [showActionSheetWithOptions]);

  const reactivateTaskHandler = (task) => {
    dispatch(taskActions.reactivateTask(task));
  };

  const detailsPressedHandler = (task) => {};

  useEffect(() => {
    navigation.setParams({ openSortSheet: openSortSheetHandler });
  }, [openSortSheetHandler]);

  const renderTaskListItem = (itemData) => {
    return (
      <TaskListItem
        task={itemData.item}
        onCheckBoxPressed={reactivateTaskHandler.bind(null, itemData.item)}
        onDetailsPressed={detailsPressedHandler.bind(null, itemData.item)}
      />
    );
  };

  if (completedTasks === undefined || completedTasks.length === 0) {
    return (
      <View style={styles.centeredScreen}>
        <DefaultText style={{ fontSize: 16 }}>No Completed Tasks Found</DefaultText>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.fullScreen}>
      <FlatList
        style={styles.list}
        data={completedTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskListItem}
      />
    </SafeAreaView>
  );
};

CompletedToDoListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
};
CompletedToDoListScreen.defaultProps = {};

CompletedToDoListScreen.navigationOptions = (navigationData) => {
  const openShortSheetHandler = navigationData.navigation.getParam("openSortSheet");

  const openDrawerHandler = () => {
    navigationData.navigation.dispatch(DrawerActions.openDrawer());
  };

  return {
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item iconName="ios-menu" onPress={openDrawerHandler} title="Menu" />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            IconComponent={MaterialIcons}
            iconName="sort"
            onPress={openShortSheetHandler}
            title="Sort"
          />
        </HeaderButtons>
      );
    },
    headerTitle: "Completed Tasks",
  };
};

const styles = StyleSheet.create({
  centeredScreen: {
    alignItems: "center",
    backgroundColor: colors.dark.systemGray6,
    flex: 1,
    justifyContent: "center",
  },
  fullScreen: {
    backgroundColor: colors.dark.systemGray6,
    flex: 1,
  },
  list: {
    backgroundColor: colors.dark.systemGray6,
    flex: 1,
    paddingVertical: 0,
    width: "100%",
  },
});

export default connectActionSheet(CompletedToDoListScreen);
