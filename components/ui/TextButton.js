import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

const TextButton = props => {
  const { onPress, title, style, disabled } = props;
  if (disabled) {
    return <Text style={{ ...styles.disabled, ...style }}>{title}</Text>;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ ...styles.text, ...style }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.primary
  },
  disabled: {
    color: "#aaa"
  }
});

export default TextButton;
