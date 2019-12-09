import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import Card from "./Card";

const ActionCard = props => {
  const { style, title, actionButtons, children } = props;

  return (
    <Card style={{ ...style }}>
      <View style={styles.cardHeaderContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderTitle}>{title}</Text>
          {actionButtons
            ? actionButtons.map((actionButton, index) => (
                <View key={index}>{actionButton}</View>
              ))
            : null}
        </View>
      </View>

      <View style={styles.cardBody}>{children}</View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardHeaderContainer: {
    backgroundColor: "white",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardHeaderTitle: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16
  },
  cardBody: {
    marginVertical: 10,
    justifyContent: "flex-start"
  }
});

export default ActionCard;
