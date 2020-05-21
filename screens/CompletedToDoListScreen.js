import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "react-navigation-drawer";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import DefaultText from "../components/ui/DefaultText";
import TaskListItem from "../components/task/TaskListItem";

import colors from "../constants/colors";
import types from "../constants/types";
import * as taskActions from "../store/actions/tasks";

const CompletedToDoListScreen = (props) => {
  const { navigation } = props;
  const completedTasks = useSelector((state) => state.tasks.completedTasks);
  const lastCompletedListSortType = useSelector((state) => state.tasks.lastCompletedListSortType);
  const dispatch = useDispatch();

  const sortTasksHandler = useCallback(() => {
    const newSortType =
      lastCompletedListSortType === types.sort.byDateCompletedAsc
        ? types.sort.byDateCompletedDesc
        : types.sort.byDateCompletedAsc;
    dispatch(taskActions.sortTasks(newSortType, false));
  }, [dispatch, lastCompletedListSortType, taskActions]);

  const reactivateTaskHandler = (task) => {
    dispatch(taskActions.reactivateTask(task));
  };

  const detailsPressedHandler = (task) => {};

  useEffect(() => {
    navigation.setParams({ sortTasks: sortTasksHandler });
  }, [sortTasksHandler]);

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
  const sortTasksHandler = navigationData.navigation.getParam("sortTasks");

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
            onPress={sortTasksHandler}
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

export default CompletedToDoListScreen;
