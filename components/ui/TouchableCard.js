import React from "react";
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform
} from "react-native";

import Card from "./Card";

const TouchableCard = props => {
  const { style, children, onPress, noFeedback } = props;

  let TouchableComponent;
  if (noFeedback) {
    TouchableComponent = TouchableWithoutFeedback;
  } else {
    if (Platform.OS === "android" && Platform.Version >= 21) {
      TouchableComponent = TouchableNativeFeedback;
    } else {
      TouchableComponent = TouchableOpacity;
    }
  }

  return (
    <Card style={style}>
      <TouchableComponent onPress={onPress} useForeground>
        <View style={styles.touchable}>{children}</View>
      </TouchableComponent>
    </Card>
  );
};

const styles = StyleSheet.create({
  touchable: {
    // borderRadius: 8,
    overflow: "hidden"
  }
});

export default TouchableCard;
