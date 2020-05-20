import React from "react";
import PropTypes from "prop-types";
import { Button, StyleSheet, View, StatusBar } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "react-navigation-drawer";

import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import DefaultText from "../components/ui/DefaultText";

import colors from "../constants/colors";

const ActiveToDoListScreen = (props) => {
  const { navigation } = props;

  const handleNavigation = (routeName, params) => {
    navigation.navigate(routeName, params);
  };

  return (
    <View style={styles.centeredScreen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark.systemGray5} />
      <DefaultText>Active Tasks</DefaultText>
      <Button title="Go to create screen" onPress={handleNavigation.bind(null, "CreateToDo", {})} />
      <Button title="Go to edit screen" onPress={handleNavigation.bind(null, "EditToDo", {})} />
    </View>
  );
};

ActiveToDoListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
ActiveToDoListScreen.defaultProps = {};

ActiveToDoListScreen.navigationOptions = (navigationData) => {
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
});

export default ActiveToDoListScreen;
