import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../constants/colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={colors.dark.blue} />
  );
};

export default CustomHeaderButton;
