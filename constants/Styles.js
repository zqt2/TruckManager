import { StyleSheet } from "react-native";
import Colors from "./Colors";

export default StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  messageText: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 16
  }
});
