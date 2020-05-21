import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TextInput, View } from "react-native";

import DefaultText from "./DefaultText";
import colors from "../../constants/colors";

const CustomTextInput = (props) => {
  const { label, style } = props;

  return (
    <View style={styles.formControl}>
      <DefaultText style={styles.label}>{label}</DefaultText>
      <TextInput {...props} style={{ ...styles.input, ...style }} />
    </View>
  );
};

CustomTextInput.propTypes = {
  label: PropTypes.string,
  style: TextInput.propTypes.style,
};

CustomTextInput.defaultProps = {
  label: "",
  style: StyleSheet.create({}),
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  input: {
    backgroundColor: colors.dark.systemGray5,
    borderBottomColor: colors.dark.systemGray3,
    borderBottomWidth: 1,
    color: colors.dark.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
});

export default CustomTextInput;
