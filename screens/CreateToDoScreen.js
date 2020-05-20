import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";

import CallToActionButton from "../components/ui/CallToActionButton";
import CustomTextInput from "../components/ui/CustomTextInput";

import colors from "../constants/colors";

const CreateToDoScreen = (props) => {
  const { navigation } = props;

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("name");
    register("description");
  }, [register]);

  const onSubmitHandler = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.centeredScreen}>
      <CustomTextInput
        label="Name"
        onChangeText={(text) => {
          setValue("name", text);
        }}
      />
      <CustomTextInput
        label="Description"
        style={styles.textArea}
        multiline
        onChangeText={(text) => {
          setValue("description", text);
        }}
      />
      <View style={styles.buttonContainer}>
        <CallToActionButton label="Submit" onPress={handleSubmit(onSubmitHandler)} />
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
