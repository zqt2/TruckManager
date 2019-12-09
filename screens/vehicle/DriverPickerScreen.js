import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Platform
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/ui/HeaderButton";
import DriverItem from "../../components/driver/DriverItem";

const DriverPickerScreen = props => {
  const { navigation } = props;
  const drivers = useSelector(state => state.drivers.drivers);
  const selectedParam = navigation.getParam("selected");
  const returnSelection = navigation.getParam("returnSelection");

  const [selected, setSelected] = useState(selectedParam);

  const saveSelectionHandler = useCallback(() => {
    returnSelection(selected);
    navigation.goBack();
  }, [returnSelection, selected]);

  useEffect(() => {
    navigation.setParams({ onSave: saveSelectionHandler });
  }, [saveSelectionHandler]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.fixedTop}>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome
            name="drivers-license"
            color="rgba(0,120,0,1)"
            size={22}
          />
          <Text style={{ paddingLeft: 6 }}>Assigned</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome name="drivers-license-o" color="#666" size={22} />
          <Text style={{ paddingLeft: 6 }}>Not Assigned</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          data={drivers}
          keyExtractor={item => item.id.toString()}
          renderItem={itemData => {
            const picked = selected.some(id => id === itemData.item.id);
            return (
              <DriverItem
                data={itemData.item}
                isPicker
                picked={picked}
                onItemSelect={() => {
                  const id = itemData.item.id;
                  setSelected(prevSelected => {
                    const index = prevSelected.indexOf(id);
                    if (index == -1) {
                      return prevSelected.concat(id);
                    } else {
                      return prevSelected.slice(index, 1);
                    }
                  });
                }}
              />
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

DriverPickerScreen.navigationOptions = navData => {
  const onSave = navData.navigation.getParam("onSave");
  return {
    headerTitle: "Assign Driver",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={onSave}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  fixedTop: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
    paddingBottom: 10
  }
});

export default DriverPickerScreen;
