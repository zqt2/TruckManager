import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Keyboard,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import IconButton from "./IconButton";
import Colors from "../../constants/Colors";

const SearchFilter = props => {
  const { style, title, maxLength, onChangeText, recCount, searching } = props;
  const [searchText, setSearchText] = useState("");

  const searchTextHandler = text => {
    setSearchText(text);
    onChangeText(text);
  };

  const clearSearchTextHandler = () => {
    searchTextHandler("");
    Keyboard.dismiss();
  };

  return (
    <View style={{ ...style, marginHorizontal: 20 }}>
      <View style={styles.searchContainer}>
        <View style={styles.searchTextContainer}>
          <Ionicons
            name={Platform.OS === "android" ? "md-search" : "ios-search"}
            size={25}
            color={Colors.primary}
          />
          <TextInput
            style={styles.searchText}
            placeholder={title}
            placeholderTextColor="#666"
            maxLength={maxLength}
            value={searchText}
            onChangeText={searchTextHandler}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.clearSearchContainer}>
          {searching ? (
            <ActivityIndicator
              style={{ paddingRight: 6 }}
              size="small"
              color={Colors.primary}
            />
          ) : null}
          {!!recCount ? (
            <Text style={{ color: "#888", paddingRight: 6 }}>({recCount})</Text>
          ) : null}
          {!!searchText ? (
            <IconButton
              IconCmp={Ionicons}
              name={
                Platform.OS === "android"
                  ? "md-close-circle"
                  : "ios-close-circle"
              }
              size={18}
              color="#666"
              onPress={clearSearchTextHandler}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  searchTextContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  searchText: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    width: "70%"
  },
  clearSearchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SearchFilter;
