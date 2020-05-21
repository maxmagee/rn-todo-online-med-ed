import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import DefaultText from "../ui/DefaultText";
import CircleCheckBox from "../ui/CircleCheckBox";
import PriorityButton from "./PriorityButton";

import colors from "../../constants/colors";
import types from "../../constants/types";

const moment = require("moment");

const TaskListItem = (props) => {
  const { onCheckBoxPressed, onDetailsPressed, task } = props;

  const renderDate = () => {
    if (task.isActive) {
      const dateTextStyle = {};
      if (!moment().isBefore(task.dueDate)) {
        dateTextStyle.color = colors.dark.red;
      }

      return (
        <View style={styles.row}>
          <DefaultText style={{ ...styles.dateText, ...dateTextStyle }}>
            {task.displayDueDate}
          </DefaultText>
        </View>
      );
    }
    return (
      <View style={styles.row}>
        <DefaultText style={styles.dateText}>Completed: {task.displayDateCompleted}</DefaultText>
      </View>
    );
  };

  const renderPriorityIndicator = () => {
    if (!task.priorityKey) return null;

    return (
      <PriorityButton
        isActive={false}
        isDisabled
        onPress={() => {}}
        priority={types.priority[task.priorityKey]}
      />
    );
  };

  return (
    <TouchableOpacity onPress={onDetailsPressed}>
      <View style={styles.container}>
        <CircleCheckBox isChecked={!task.isActive} onPress={onCheckBoxPressed} />
        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <DefaultText style={styles.nameText}>{task.name}</DefaultText>
          </View>
          {renderDate()}
        </View>
        {renderPriorityIndicator()}
      </View>
    </TouchableOpacity>
  );
};

TaskListItem.propTypes = {
  onCheckBoxPressed: PropTypes.func.isRequired,
  onDetailsPressed: PropTypes.func.isRequired,
  task: PropTypes.shape({
    displayDateCompleted: PropTypes.string,
    displayDueDate: PropTypes.string.isRequired,
    dueDate: PropTypes.instanceOf(Date),
    id: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    priorityKey: PropTypes.string,
  }).isRequired,
};
TaskListItem.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderBottomColor: colors.dark.systemGray3,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 60,
    padding: 10,
  },
  dateText: {
    fontSize: 13,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  nameText: {
    fontSize: 17,
  },
  row: {},
});

export default TaskListItem;
