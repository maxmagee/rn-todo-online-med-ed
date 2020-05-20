import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import DefaultText from "../ui/DefaultText";
import CircleCheckBox from "../ui/CircleCheckBox";
import colors from "../../constants/colors";

const TaskListItem = (props) => {
  const { task } = props;

  const handleCheckBoxPressed = () => {
    console.log(`pressed ${task.id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkBoxContainer}>
        <CircleCheckBox isChecked={task.isActive} onPress={handleCheckBoxPressed} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <DefaultText style={styles.nameText}>{task.name}</DefaultText>
        </View>
        <View style={styles.row}>
          <DefaultText style={styles.dateText}>{task.displayDate}</DefaultText>
        </View>
      </View>
    </View>
  );
};

TaskListItem.propTypes = {
  task: PropTypes.shape({
    displayDate: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
TaskListItem.defaultProps = {};

const styles = StyleSheet.create({
  checkBoxContainer: {
    // backgroundColor: "yellow",
  },
  container: {
    alignItems: "center",
    // backgroundColor: "red",
    borderBottomColor: colors.dark.systemGray3,
    borderBottomWidth: 1,
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
  },
  dateText: {
    fontSize: 13,
  },
  detailsContainer: {
    // backgroundColor: "green",
    flex: 1,
    justifyContent: "space-around",
    paddingLeft: 10,
  },
  nameText: {
    fontSize: 17,
  },
});

export default TaskListItem;
