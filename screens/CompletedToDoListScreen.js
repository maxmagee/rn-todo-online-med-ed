import React from "react";
import PropTypes from "prop-types";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "react-navigation-drawer";

import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import DefaultText from "../components/ui/DefaultText";
import TaskListItem from "../components/task/TaskListItem";

import colors from "../constants/colors";
import TASKS from "../data/dummy-data";

const completedTasks = TASKS.filter((task) => !task.isActive);

const CompletedToDoListScreen = (props) => {
  const { navigation } = props;

  const renderTaskListItem = (itemData) => {
    return <TaskListItem task={itemData.item} />;
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
  }).isRequired,
};
CompletedToDoListScreen.defaultProps = {};

CompletedToDoListScreen.navigationOptions = (navigationData) => {
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
