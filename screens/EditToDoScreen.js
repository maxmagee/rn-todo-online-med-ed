import React, { useState } from "react";
import PropTypes from "prop-types";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  Alert,
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import CallToActionButton from "../components/ui/CallToActionButton";
import CustomTextInput from "../components/ui/CustomTextInput";
import DefaultText from "../components/ui/DefaultText";
import PriorityButton from "../components/task/PriorityButton";

import colors from "../constants/colors";
import types from "../constants/types";
import * as taskActions from "../store/actions/tasks";

const moment = require("moment");

const today = new Date();

const EditToDoScreen = (props) => {
  const { navigation } = props;
  const task = navigation.getParam("task");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isLowPriority, setIsLowPriority] = useState(task.priorityKey === types.priority.keys.low);
  const [isMedPriority, setIsMedPriority] = useState(
    task.priorityKey === types.priority.keys.medium
  );
  const [isHighPriority, setIsHighPriority] = useState(
    task.priorityKey === types.priority.keys.high
  );
  const [currentPriorityKey, setCurrentPriorityKey] = useState(task.priorityKey);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const dispatch = useDispatch();

  const { control, setValue, handleSubmit, errors, setError } = useForm();

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const dateConfirmedHandler = (date) => {
    // Set local state variable so we can display a different value
    setDueDate(date);
    // Use the display version in the text input
    setValue("dueDate", moment(date).format("ddd LL"));
    hideDatePicker();
  };

  const switchPriorityHandler = (priorityKey) => {
    switch (priorityKey) {
      case types.priority.keys.low: {
        setIsLowPriority((prevIsLowPriority) => {
          if (prevIsLowPriority) {
            setCurrentPriorityKey(null);
          } else {
            setCurrentPriorityKey(priorityKey);
          }
          return !prevIsLowPriority;
        });
        setIsMedPriority(false);
        setIsHighPriority(false);
        break;
      }
      case types.priority.keys.medium: {
        setIsMedPriority((prevIsMedPriority) => {
          if (prevIsMedPriority) {
            setCurrentPriorityKey(null);
          } else {
            setCurrentPriorityKey(priorityKey);
          }
          return !prevIsMedPriority;
        });
        setIsLowPriority(false);
        setIsHighPriority(false);
        break;
      }
      case types.priority.keys.high: {
        setIsHighPriority((prevIsHighPriority) => {
          if (prevIsHighPriority) {
            setCurrentPriorityKey(null);
          } else {
            setCurrentPriorityKey(priorityKey);
          }
          return !prevIsHighPriority;
        });
        setIsLowPriority(false);
        setIsMedPriority(false);
        break;
      }
      default:
        break;
    }
  };

  const onSubmitHandler = (data) => {
    if (data.name.trim().length === 0) {
      setError("name", "minLength", "Name is required.");
      return;
    }
    task.description = data.description.trim().trimStart();
    task.dueDate = dueDate;
    task.name = data.name.trim().trimStart();
    task.priorityKey = currentPriorityKey;

    dispatch(taskActions.editTask(task));
    navigation.goBack();
  };

  const onDeleteHandler = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        style: "cancel",
        text: "Cancel",
      },
      {
        onPress: () => {
          dispatch(taskActions.deleteTask(task));
          navigation.goBack();
        },
        style: "destructive",
        text: "Delete",
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.scrollView}>
        <View behavior="height" style={styles.centeredScreen}>
          <Controller
            as={<CustomTextInput label="Name" />}
            control={control}
            name="name"
            onChange={(args) => args[0].nativeEvent.text}
            defaultValue={task.name}
            rules={{ required: true }}
          />
          {errors.name && (
            <View style={styles.errorTextContainer}>
              <DefaultText style={styles.errorText}>Name is required.</DefaultText>
            </View>
          )}
          <Controller
            as={<CustomTextInput label="Description" multiline style={styles.textArea} />}
            control={control}
            name="description"
            onChange={(args) => args[0].nativeEvent.text}
            defaultValue={task.description}
          />
          <Controller
            as={<CustomTextInput label="Due Date" editable={false} onFocus={showDatePicker} />}
            control={control}
            name="dueDate"
            onChange={(args) => args[0].nativeEvent.text}
            defaultValue={moment(task.dueDate).format("ddd LL")}
          />
          <View>
            <Button color={colors.dark.blue} title="Change Due Date" onPress={showDatePicker} />
            <DateTimePickerModal
              mode="date"
              date={dueDate}
              minimumDate={today}
              isVisible={isDatePickerVisible}
              onConfirm={dateConfirmedHandler}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={styles.prioritiesContainer}>
            <PriorityButton
              isActive={isLowPriority}
              priority={types.priority.low}
              onPress={switchPriorityHandler.bind(null, types.priority.keys.low)}
              showLabel
            />
            <PriorityButton
              isActive={isMedPriority}
              priority={types.priority.medium}
              onPress={switchPriorityHandler.bind(null, types.priority.keys.medium)}
              showLabel
            />
            <PriorityButton
              isActive={isHighPriority}
              priority={types.priority.high}
              onPress={switchPriorityHandler.bind(null, types.priority.keys.high)}
              showLabel
            />
          </View>
          <View style={styles.buttonContainer}>
            <CallToActionButton label="Save" onPress={handleSubmit(onSubmitHandler)} />
            <CallToActionButton isDestructive label="Delete" onPress={onDeleteHandler} />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

EditToDoScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
EditToDoScreen.defaultProps = {};

EditToDoScreen.navigationOptions = {
  headerTitle: "Edit",
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 120,
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  centeredScreen: {
    alignItems: "center",
    backgroundColor: colors.dark.systemGray6,
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  errorText: {
    color: colors.dark.red,
  },
  errorTextContainer: {
    paddingTop: 5,
  },
  prioritiesContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    width: "100%",
  },
  scrollView: {
    backgroundColor: colors.dark.systemGray6,
    height: "100%",
  },
  textArea: {
    height: 80,
  },
});

export default EditToDoScreen;
