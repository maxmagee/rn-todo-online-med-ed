import React from "react";
import { StyleSheet, TouchableHighlight, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";

import DefaultText from "./DefaultText";

import colors from "../../constants/colors";

const CallToActionButton = (props) => {
  const { isDestructive, label, onPress, style } = props;
  const upperColor = isDestructive ? colors.dark.red : colors.dark.blue;
  const lowerColor = isDestructive ? colors.dark.redDarker : colors.dark.indigo;

  return (
    <TouchableHighlight onPress={onPress} underlayColor="transparent">
      <LinearGradient
        colors={[upperColor, lowerColor]}
        style={{ ...styles.gradientStyle, ...style }}
      >
        <DefaultText style={styles.labelText}>{label}</DefaultText>
      </LinearGradient>
    </TouchableHighlight>
  );
};

CallToActionButton.propTypes = {
  isDestructive: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
};

CallToActionButton.defaultProps = {
  isDestructive: false,
  style: StyleSheet.create({}),
};

const styles = StyleSheet.create({
  gradientStyle: {
    alignItems: "center",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
  },
  labelText: {
    color: colors.dark.lightGray,
    fontFamily: "open-sans-bold",
  },
});

export default CallToActionButton;
