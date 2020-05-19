import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";

const CreateToDoScreen = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.centeredScreen}>
      <Text>CreateToDoScreen</Text>
    </View>
  );
};

CreateToDoScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
CreateToDoScreen.defaultProps = {};

const styles = StyleSheet.create({
  centeredScreen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default CreateToDoScreen;
