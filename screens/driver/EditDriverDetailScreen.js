import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as driverActions from "../../store/driver-actions";
import Driver from "../../models/driver";

const EditDeriverDetailScreen = props => {
  const vehicles = useSelector(state => state.vehicles.vehicles);
  const drivers = useSelector(state => state.drivers.drivers);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(
        driverActions.addDriver(
          new Driver(
            Math.round(Math.random() * 1000),
            "Sandeep Hirapur",
            "9900584204",
            "9890107321",
            "http://res.cloudinary.com/bundlz-test/image/upload/v1536055984/Wohven_whkabm.png", // photo
            "KA32/2007/904320",
            null, // dl image
            "ACTIVE",
            "PERMANENT",
            vehicles.length > 0 ? vehicles[0] : null
          )
        )
      );
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  return (
    <View>
      <Text>EditDeriverDetailScreen</Text>
    </View>
  );
};

EditDeriverDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: "Add Driver"
  };
};
const styles = StyleSheet.create({});

export default EditDeriverDetailScreen;
