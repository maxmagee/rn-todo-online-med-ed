import React, { useState } from "react";
import PropTypes from "prop-types";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import CallToActionButton from "../components/ui/CallToActionButton";
import CustomTextInput from "../components/ui/CustomTextInput";
import DefaultText from "../components/ui/DefaultText";
import PriorityButton from "../components/task/PriorityButton";

import colors from "../constants/colors";
import types from "../constants/types";
import * as taskActions from "../store/actions/tasks";

const moment = require("moment");

const today = new Date();

const CreateToDoScreen = (props) => {
  const { navigation } = props;
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isLowPriority, setIsLowPriority] = useState(false);
  const [isMedPriority, setIsMedPriority] = useState(false);
  const [isHighPriority, setIsHighPriority] = useState(false);
  const [currentPriorityKey, setCurrentPriorityKey] = useState(null);
  const [dueDate, setDueDate] = useState(today);
  const lastActiveListSortType = useSelector((state) => state.tasks.lastActiveListSortType);
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

  const onSubmitHandler = (data) => {
    if (data.name.trim().length === 0) {
      setError("name", "minLength", "Name is required.");
      return;
    }
    const trimmedName = data.name.trim().trimStart();
    const trimmedDescription = data.name.trim().trimStart();
    dispatch(
      taskActions.createTask(currentPriorityKey, trimmedName, trimmedDescription, dueDate || today)
    );
    dispatch(taskActions.sortTasks(lastActiveListSortType, true));
    navigation.goBack();
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.scrollView}>
        <View behavior="height" style={styles.centeredScreen}>
          <Controller
            as={<CustomTextInput label="Name" />}
            control={control}
            name="name"
            onChange={(args) => args[0].nativeEvent.text}
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
          />
          <Controller
            as={<CustomTextInput label="Due Date" editable={false} onFocus={showDatePicker} />}
            control={control}
            name="dueDate"
            onChange={(args) => args[0].nativeEvent.text}
            defaultValue={moment(today).format("ddd LL")}
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
            />
            <PriorityButton
              isActive={isMedPriority}
              priority={types.priority.medium}
              onPress={switchPriorityHandler.bind(null, types.priority.keys.medium)}
            />
            <PriorityButton
              isActive={isHighPriority}
              priority={types.priority.high}
              onPress={switchPriorityHandler.bind(null, types.priority.keys.high)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CallToActionButton label="Submit" onPress={handleSubmit(onSubmitHandler)} />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
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

export default CreateToDoScreen;
