import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";

const EditToDoScreen = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.centeredScreen}>
      <Text>EditToDoScreen</Text>
    </View>
  );
};

EditToDoScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
EditToDoScreen.defaultProps = {};

const styles = StyleSheet.create({
  centeredScreen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default EditToDoScreen;
