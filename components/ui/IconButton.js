import React from "react";
import { TouchableOpacity } from "react-native";

const IconButton = props => {
  const { IconCmp, name, size, color, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <IconCmp name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;
