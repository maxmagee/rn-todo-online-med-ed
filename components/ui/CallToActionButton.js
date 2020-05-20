import React from "react";
import { StyleSheet, TouchableHighlight, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";

import DefaultText from "./DefaultText";

import colors from "../../constants/colors";

const CallToActionButton = (props) => {
  const { label, onPress, style } = props;

  return (
    <TouchableHighlight onPress={onPress} underlayColor="transparent">
      <LinearGradient
        colors={[colors.dark.blue, colors.dark.indigo]}
        style={{ ...styles.gradientStyle, ...style }}
      >
        <DefaultText style={styles.labelText}>{label}</DefaultText>
      </LinearGradient>
    </TouchableHighlight>
  );
};

CallToActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
};

CallToActionButton.defaultProps = {
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
