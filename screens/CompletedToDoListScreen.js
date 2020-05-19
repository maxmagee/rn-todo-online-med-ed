import React from "react";
import PropTypes from "prop-types";
import { Button, StyleSheet, Text, View } from "react-native";

const CompletedToDoListScreen = (props) => {
  const { navigation } = props;

  const handleNavigation = (routeName, params) => {
    navigation.navigate(routeName, params);
  };

  return (
    <View>
      <Text>CompletedToDoListScreen</Text>
      <Button title="Go to create screen" onPress={handleNavigation.bind(null, "CreateToDo", {})} />
      <Button title="Go to edit screen" onPress={handleNavigation.bind(null, "EditToDo", {})} />
    </View>
  );
};

CompletedToDoListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
CompletedToDoListScreen.defaultProps = {};

const styles = StyleSheet.create({
  centeredScreen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default CompletedToDoListScreen;
