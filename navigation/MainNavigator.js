import React from "react";
import { Platform } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import StartupScreen from "../screens/StartupScreen";
import VehicleOverviewScreen from "../screens/vehicle/VehicleOverviewScreen";
import EditVehicleDetailScreen from "../screens/vehicle/EditVehicleDetailScreen";
import DriverOverviewScreen from "../screens/driver/DriverOverviewScreen";
import EditDriverDetailScreen from "../screens/driver/EditDriverDetailScreen";
import DriverPickerScreen from "../screens/vehicle/DriverPickerScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ""
  },
  headerTitleStyle: {
    color: Platform.OS === "android" ? "white" : Colors.primary
  },
  headerBackTitleStyle: {
    color: Platform.OS === "android" ? "white" : Colors.primary
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};

const VehicleNavigator = createStackNavigator(
  {
    VehicleOverview: VehicleOverviewScreen,
    EditVehicleDetail: EditVehicleDetailScreen,
    DriverPicker: DriverPickerScreen
  },
  {
    initialRouteName: "VehicleOverview",
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <MaterialCommunityIcons
          name="truck-fast"
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const DriverNavigator = createStackNavigator(
  {
    DriverOverview: DriverOverviewScreen,
    EditDriverDetail: EditDriverDetailScreen
  },
  {
    initialRouteName: "DriverOverview",
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name="ios-people" size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const FleetManagerNavigator = createDrawerNavigator(
  {
    Vehicles: VehicleNavigator,
    Drivers: DriverNavigator
  },
  {
    initialRouteName: "Vehicles",
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  FleetManager: FleetManagerNavigator
});

export default createAppContainer(MainNavigator);
