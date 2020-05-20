import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../constants/colors";

const CircleCheckBox = (props) => {
  const { isChecked, onPress } = props;

  const renderCheckBoxState = () => {
    if (isChecked) {
      return (
        <Ionicons
          style={{ paddingTop: 2 }}
          name="ios-checkmark-circle-outline"
          size={25}
          color={colors.dark.lightGray}
        />
      );
    }
    return <View style={styles.container} />;
  };

  return <TouchableHighlight onPress={onPress}>{renderCheckBoxState()}</TouchableHighlight>;
};

CircleCheckBox.propTypes = {
  isChecked: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

CircleCheckBox.defaultProps = {
  isChecked: false,
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.dark.lightGray,
    borderRadius: 10,
    borderWidth: 1,
    height: 20,
    width: 20,
  },
});

export default CircleCheckBox;
