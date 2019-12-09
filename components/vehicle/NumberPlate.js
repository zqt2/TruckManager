import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const NumberPlate = props => {
  const { style, title } = props;
  return (
    <View style={{ ...styles.numberPlate, ...style }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  numberPlate: {
    width: 90,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.yellowBoard,
    borderWidth: 0.5,
    borderColor: "#666",
    borderRadius: 8
  }
});

export default NumberPlate;
