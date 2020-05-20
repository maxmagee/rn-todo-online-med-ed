import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import CallToActionButton from "../components/ui/CallToActionButton";
import CustomTextInput from "../components/ui/CustomTextInput";

import colors from "../constants/colors";
import * as taskActions from "../store/actions/tasks";

const CreateToDoScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("name");
    register("description");
  }, [register]);

  const onSubmitHandler = (data) => {
    dispatch(taskActions.createTask(data.name, data.description, new Date()));
    navigation.goBack();
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
    goBack: PropTypes.func.isRequired,
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
