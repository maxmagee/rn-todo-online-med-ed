import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import CallToActionButton from "../components/ui/CallToActionButton";
import CustomTextInput from "../components/ui/CustomTextInput";

import colors from "../constants/colors";
import * as taskActions from "../store/actions/tasks";

const moment = require("moment");

const today = new Date();

const CreateToDoScreen = (props) => {
  const { navigation } = props;
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [dueDate, setDueDate] = useState(today);
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("name");
    register("description");
    register("dueDate");
  }, [register]);

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const dateConfirmedHandler = (date) => {
    setDueDate(date);
    setValue("dueDate", date.toString());
    hideDatePicker();
  };

  const onSubmitHandler = (data) => {
    dispatch(taskActions.createTask(data.name, data.description, data.dueDate || today));
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
      <CustomTextInput
        onFocus={showDatePicker}
        label="Due Date"
        editable={false}
        value={moment(dueDate).format("ddd LL")}
      />
      <View>
        <Button color={colors.dark.blue} title="Change Due Date" onPress={showDatePicker} />
        <DateTimePickerModal
          mode="date"
          minimumDate={today}
          isVisible={isDatePickerVisible}
          onConfirm={dateConfirmedHandler}
          onCancel={hideDatePicker}
        />
      </View>
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
