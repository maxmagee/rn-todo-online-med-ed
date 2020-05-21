import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { FlatList, SafeAreaView, StyleSheet, View, StatusBar } from "react-native";
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

const ActiveToDoListScreen = (props) => {
  const { navigation } = props;
  const activeTasks = useSelector((state) => state.tasks.activeTasks);
  const lastActiveListSortType = useSelector((state) => state.tasks.lastActiveListSortType);
  const dispatch = useDispatch();

  const sortTasksHandler = useCallback(() => {
    const newSortType =
      lastActiveListSortType === types.sort.byDueDateAsc
        ? types.sort.byDueDateDesc
        : types.sort.byDueDateAsc;
    dispatch(taskActions.sortTasks(newSortType, true));
  }, [dispatch, lastActiveListSortType, taskActions]);

  const completeTaskHandler = (task) => {
    dispatch(taskActions.completeTask(task));
  };

  const editTaskHandler = (task) => {
    navigation.navigate("EditToDo", { task });
  };

  useEffect(() => {
    navigation.setParams({ sortTasks: sortTasksHandler });
  }, [sortTasksHandler]);

  const renderTaskListItem = (itemData) => {
    return (
      <TaskListItem
        task={itemData.item}
        onCheckBoxPressed={completeTaskHandler.bind(null, itemData.item)}
        onDetailsPressed={editTaskHandler.bind(null, itemData.item)}
      />
    );
  };

  if (activeTasks === undefined || activeTasks.length === 0) {
    return (
      <View style={styles.centeredScreen}>
        <DefaultText style={{ fontSize: 16 }}>No Active Tasks Found</DefaultText>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.fullScreen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark.systemGray5} />
      <FlatList
        style={styles.list}
        data={activeTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskListItem}
      />
    </SafeAreaView>
  );
};

ActiveToDoListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
};
ActiveToDoListScreen.defaultProps = {};

ActiveToDoListScreen.navigationOptions = (navigationData) => {
  const sortTasksHandler = navigationData.navigation.getParam("sortTasks");

  const goToCreateScreenHandler = () => {
    navigationData.navigation.navigate("CreateToDo");
  };

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
          <Item iconName="ios-add" onPress={goToCreateScreenHandler} title="Create" />
        </HeaderButtons>
      );
    },
    headerTitle: "Active Tasks",
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

export default ActiveToDoListScreen;
