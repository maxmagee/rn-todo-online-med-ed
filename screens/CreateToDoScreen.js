import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import CallToActionButton from "../components/ui/CallToActionButton";
import CustomTextInput from "../components/ui/CustomTextInput";

import colors from "../constants/colors";

const CreateToDoScreen = (props) => {
  const { navigation } = props;

  const onSubmitHandler = () => {
    console.log("submit pressed");
  };

  return (
    <View style={styles.centeredScreen}>
      <CustomTextInput label="Name" />
      <CustomTextInput label="Description" style={styles.textArea} multiline />
      <View style={styles.buttonContainer}>
        <CallToActionButton label="Submit" onPress={onSubmitHandler} />
      </View>
    </View>
  );
};

CreateToDoScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
CreateToDoScreen.defaultProps = {};

CreateToDoScreen.navigationOptions = {
  headerTitle: "Create",
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
  centeredScreen: {
    alignItems: "center",
    backgroundColor: colors.dark.systemGray6,
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  textArea: {
    height: 80,
  },
});

export default CreateToDoScreen;
