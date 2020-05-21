import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import DefaultText from "../ui/DefaultText";

import colors from "../../constants/colors";

const PriorityButton = (props) => {
  const { isActive, isDisabled, onPress, priority, showLabel } = props;
  const fillColor = priority.color;
  const buttonStyle = isActive ? { ...styles.button, ...styles.activeButton } : styles.button;

  return (
    <TouchableOpacity disabled={isDisabled} onPress={onPress}>
      <View style={styles.container}>
        <View style={{ ...buttonStyle, backgroundColor: fillColor }} />
        {showLabel && <DefaultText style={styles.label}> - {priority.name}</DefaultText>}
      </View>
    </TouchableOpacity>
  );
};

PriorityButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  priority: PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
  showLabel: PropTypes.bool,
};

PriorityButton.defaultProps = {
  isDisabled: false,
  showLabel: false,
};

const styles = StyleSheet.create({
  activeButton: {
    shadowColor: "white",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 7,
  },
  button: {
    backgroundColor: colors.dark.red,
    borderRadius: 10,
    borderWidth: 1,
    height: 20,
    width: 20,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  label: {
    fontFamily: "open-sans-bold",
  },
});

export default PriorityButton;
