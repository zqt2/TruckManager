import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Platform,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createFilter } from "react-native-search-filter";

import HeaderButton from "../../components/ui/HeaderButton";
import SearchFilter from "../../components/ui/SearchFilter";
import TextButton from "../../components/ui/TextButton";
import VehicleItem from "../../components/vehicle/VehicleItem";
import AppStyles from "../../constants/Styles";
import Colors from "../../constants/Colors";

import * as vehicleActions from "../../store/vehicle-actions";
import * as driverActions from "../../store/driver-actions";

const KEYS_TO_FILTERS = ["number", "drivers.name"];

const NAV_EDIT_DETAIL = "EditVehicleDetail";

const VehicleOverviewScreen = props => {
  const { navigation } = props;
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const vehicles = useSelector(state => state.vehicles.vehicles);

  const filteredVehicles = vehicles.filter(
    createFilter(searchText, KEYS_TO_FILTERS)
  );

  const searchTextChangeHandler = useCallback(
    text => {
      setSearchText(text);
    },
    [setSearchText]
  );

  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(vehicleActions.setVehicles());
    dispatch(driverActions.setDrivers());
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(vehicleActions.setVehicles());
    dispatch(driverActions.setDrivers());
    setRefreshing(false);
  }, [refreshing, dispatch]);

  if (isLoading) {
    return (
      <View style={AppStyles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (vehicles.length === 0) {
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
          <Text style={{ fontSize: 16 }}>No vehicles to display, press </Text>
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
        title="Search vehicles or drivers..."
        maxLength={20}
        recCount={filteredVehicles.length}
        onChangeText={searchTextChangeHandler}
      />
      <FlatList
        data={filteredVehicles}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => (
          <VehicleItem
            data={itemData.item}
            onSelect={() => {
              console.log("Navigating to ", NAV_EDIT_DETAIL);
              navigation.navigate(NAV_EDIT_DETAIL, {
                vehicleId: itemData.item.id,
                vehicleNum: itemData.item.number
              });
            }}
          />
        )}
      />
    </ScrollView>
  );
};

VehicleOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "Vehicles",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate(NAV_EDIT_DETAIL);
          }}
        />
      </HeaderButtons>
    )
  };
};

export default VehicleOverviewScreen;
