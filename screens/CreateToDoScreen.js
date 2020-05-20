import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import DefaultText from "../components/ui/DefaultText";

import colors from "../constants/colors";

const CreateToDoScreen = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.centeredScreen}>
      <DefaultText>Create ToDo</DefaultText>
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
    backgroundColor: colors.dark.systemGray6,
    flex: 1,
    justifyContent: "center",
  },
});

export default CreateToDoScreen;
