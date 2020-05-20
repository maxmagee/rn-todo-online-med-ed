import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import DefaultText from "../components/ui/DefaultText";

import colors from "../constants/colors";

const CompletedToDoListScreen = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.centeredScreen}>
      <DefaultText>Completed Tasks</DefaultText>
    </View>
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
});

export default CompletedToDoListScreen;
