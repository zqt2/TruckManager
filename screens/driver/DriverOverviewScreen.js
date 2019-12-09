import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
  Platform
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createFilter } from "react-native-search-filter";

import HeaderButton from "../../components/ui/HeaderButton";
import SearchFilter from "../../components/ui/SearchFilter";
import DriverItem from "../../components/driver/DriverItem";
import TextButton from "../../components/ui/TextButton";
import Colors from "../../constants/Colors";
import AppStyles from "../../constants/Styles";
import * as driverActions from "../../store/driver-actions";

const KEYS_TO_FILTERS = ["name", "vehicle.number"];

const NAV_EDIT_DETAIL = "EditDriverDetail";

const DriverOverviewScreen = props => {
  const { navigation } = props;
  const drivers = useSelector(state => state.drivers.drivers);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(driverActions.setDrivers());
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(driverActions.setDrivers());
    setRefreshing(false);
  }, [refreshing, dispatch]);

  const filteredDrivers = drivers.filter(
    createFilter(searchText, KEYS_TO_FILTERS)
  );

  const searchTextChangeHandler = useCallback(
    text => {
      setSearchText(text);
    },
    [setSearchText]
  );

  if (drivers.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={AppStyles.centered}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
          />
        }
      >
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <Text style={{ fontSize: 16 }}>No drivers to display, press </Text>
          <TextButton
            title="HERE"
            style={{ fontSize: 16, fontWeight: "bold" }}
            onPress={() => navigation.navigate(NAV_EDIT_DETAIL)}
          />
          <Text> to add.</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors.primary]}
        />
      }
    >
      <SearchFilter
        title="Search drivers or vehicles..."
        maxLength={20}
        recCount={filteredDrivers.length}
        onChangeText={searchTextChangeHandler}
      />
      <FlatList
        data={filteredDrivers}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => (
          <DriverItem
            data={itemData.item}
            onItemSelect={() => {
              navigation.navigate(NAV_EDIT_DETAIL, {
                driverId: itemData.item.id
              });
            }}
          />
        )}
      />
    </ScrollView>
  );
};

DriverOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "Drivers",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => navData.navigation.navigate(NAV_EDIT_DETAIL)}
        />
      </HeaderButtons>
    )
  };
};

export default DriverOverviewScreen;
