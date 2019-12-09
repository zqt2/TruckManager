import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import NavigationContainer from "./navigation/NavigationContainer";
import vehicleReducer from "./store/vehicle-reducer";
import driverReducer from "./store/driver-reducer";

const rootReducer = combineReducers({
  vehicles: vehicleReducer,
  drivers: driverReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
