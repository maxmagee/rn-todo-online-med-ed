import React from "react";
import PropTypes from "prop-types";
import { Button, StyleSheet, Text, View } from "react-native";

const ActiveToDoListScreen = (props) => {
  const { navigation } = props;

  const handleNavigation = (routeName, params) => {
    navigation.navigate(routeName, params);
  };

  return (
    <View style={styles.centeredScreen}>
      <Text>ActiveToDoListScreen</Text>
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

const styles = StyleSheet.create({
  centeredScreen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default ActiveToDoListScreen;
