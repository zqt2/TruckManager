import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";

import { init } from "../helpers/db";

import Colors from "../constants/Colors";
import appStyles from "../constants/Styles";

const StartupScreen = props => {
  const { navigation } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLoading = async () => {
      try {
        await init();
        console.log("[StartupScreen] App initialization successful!");

        navigation.navigate("FleetManager");
      } catch (err) {
        console.log("[StartupScreen] App initialization failed!!", err);
      }
      return;
    };

    tryLoading();
  }, [dispatch]);

  return (
    <View style={appStyles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartupScreen;
