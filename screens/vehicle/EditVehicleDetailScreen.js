import React, {
  useRef,
  useState,
  useReducer,
  useCallback,
  useEffect
} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Dropdown } from "react-native-material-dropdown";
import { FontAwesome } from "@expo/vector-icons";

import HeaderButton from "../../components/ui/HeaderButton";
import Input from "../../components/ui/Input";
import IconButton from "../../components/ui/IconButton";
import TextButton from "../../components/ui/TextButton";
import Colors from "../../constants/Colors";
import * as vehicleActions from "../../store/vehicle-actions";
import * as vehicleUtils from "../../helpers/vehicleUtil";
import * as types from "../../helpers/types";
import Vehicle from "../../models/vehicle";

const INPUT_CHANGED = "INPUT_CHANGED";

const formReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGED:
      const updatedValues = { ...state.values };
      updatedValues[action.field] = action.value;
      return {
        values: updatedValues
      };
    default:
      return state;
  }
};

const EditVehicleDetailScreen = props => {
  const { navigation } = props;
  const vehicleId = navigation.getParam("vehicleId");
  const vehicleNum = navigation.getParam("vehicleNum");

  const [isSaving, setIsSaving] = useState(false);

  const [permitInputFocus, setPermitInputFocus] = useState(false);
  const permitInputFocusHandler = focus => {
    setPermitInputFocus(focus);
  };

  const [statusDropdownFocus, setStatusDropdownFocus] = useState(false);
  const statusDropdownFocusHandler = focus => {
    setStatusDropdownFocus(focus);
  };

  const dispatch = useDispatch();

  const vehicles = useSelector(state => state.vehicles.vehicles);
  const drivers = useSelector(state => state.drivers.drivers);

  const vehicle = vehicles.find(v => v.id === vehicleId);
  const isEdit = !!vehicle;

  const vehicleNumInput = useRef();
  const vehicleDescInput = useRef();
  const permitDropdown = useRef();
  const vehicleOwnerInput = useRef();
  const statusDropdown = useRef();

  const [formState, dispatchFormChange] = useReducer(formReducer, {
    values: {
      number: isEdit ? vehicle.number : "",
      description: isEdit ? vehicle.description : "",
      permit: isEdit ? vehicle.permit : "",
      owner: isEdit ? vehicle.owner : "",
      status: isEdit ? vehicle.status : "",
      drivers: isEdit ? (!!vehicle.drivers ? vehicle.drivers : []) : []
    }
  });

  const inputChangeHandler = (field, value, isValid) => {
    dispatchFormChange({
      type: INPUT_CHANGED,
      field: field,
      value: value,
      isValid: isValid
    });
  };

  const saveHandler = () => {
    setIsSaving(true);

    if (!isEdit) {
      const number = formState.values.number;
      if (!vehicleUtils.isValid(number)) {
        Alert.alert(
          "Invalid Vehicle Number",
          "Enter correct vehicle number to save the details.",
          [
            {
              text: "Ok",
              style: "destructive",
              onPress: () => {
                vehicleNumInput.current && vehicleNumInput.current.focus();
              }
            }
          ]
        );
        setIsSaving(false);
        return;
      }

      if (vehicles.some(v => v.number === number)) {
        Alert.alert(
          "Vehicle Already Exists",
          "Vehicle number you entered is already added before.",
          [
            {
              text: "Ok",
              style: "destructive",
              onPress: () => {
                vehicleNumInput.current && vehicleNumInput.current.focus();
              }
            }
          ]
        );
        setIsSaving(false);
        return;
      }
    }

    try {
      let action;
      if (isEdit) {
        const vehicleToUpdate = new Vehicle(
          vehicleId,
          formState.values.number,
          formState.values.description,
          formState.values.permit,
          formState.values.owner,
          formState.values.status,
          formState.values.drivers
        );
        action = vehicleActions.updateVehicle(vehicleToUpdate);
      } else {
        const vehicleToAdd = new Vehicle(
          null,
          formState.values.number,
          formState.values.description,
          formState.values.permit,
          formState.values.owner,
          formState.values.status,
          formState.values.drivers
        );
        action = vehicleActions.addVehicle(vehicleToAdd);
      }
      dispatch(action);
      navigation.goBack();
    } catch (err) {
      setIsSaving(false);
      console.log("[EditVehicleDetailScreen]", err);
    }
  };

  const deleteVehicleHandler = useCallback(() => {
    Alert.alert(
      "Are you sure?",
      `Do you really want to remove ${vehicleNum} ?`,
      [
        { text: "No", style: "default" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            try {
              dispatch(vehicleActions.deleteVehicle(vehicleId));
              navigation.goBack();
            } catch (err) {
              console.log("[EditVehicleDetailScreen]", err);
            }
          }
        }
      ]
    );
  }, [dispatch, vehicleId, vehicleNum]);

  useEffect(() => {
    navigation.setParams({ onDelete: deleteVehicleHandler });
  }, [deleteVehicleHandler]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.screen}>
        {!isEdit ? (
          <Input
            label="Vehicle Number"
            style={styles.input}
            initialValue={formState.values.number}
            initiallyValid
            vehicleNum
            errorMessage="Invalid vehicle number"
            onChange={inputChangeHandler.bind(this, "number")}
            inputProps={{
              placeholder: "Enter vehicle number",
              returnKeyType: "next",
              autoFocus: true,
              autoCapitalize: "characters",
              ref: input => (vehicleNumInput.current = input),
              onSubmitEditing: () => {
                vehicleDescInput.current && vehicleDescInput.current.focus();
              }
              // blurOnSubmit: false
            }}
          />
        ) : null}

        <Input
          label="Description"
          style={styles.input}
          initialValue={formState.values.description}
          initiallyValid
          onChange={inputChangeHandler.bind(this, "description")}
          inputProps={{
            placeholder: "Enter vehicle description",
            returnKeyType: "next",
            autoCapitalize: "words",
            ref: input => (vehicleDescInput.current = input),
            onSubmitEditing: () => {
              permitDropdown.current && permitDropdown.current.focus();
            }
            // blurOnSubmit: true,
          }}
        />

        <Dropdown
          label="Permit"
          data={types.VEHICLE_PERMIT}
          value={formState.values.permit}
          ref={input => {
            permitDropdown.current = input;
          }}
          onChangeText={value => {
            inputChangeHandler("permit", value);
          }}
          onFocus={permitInputFocusHandler.bind(this, true)}
          onBlur={permitInputFocusHandler.bind(this, false)}
          textColor={permitInputFocus ? Colors.primary : undefined}
          animationDuration={0}
          rippleDuration={0}
        />

        <Input
          label="Vehicle Owner"
          style={styles.input}
          initialValue={formState.values.owner}
          initiallyValid
          onChange={inputChangeHandler.bind(this, "owner")}
          inputProps={{
            placeholder: "Enter vehicle owner name",
            returnKeyType: "next",
            autoCapitalize: "words",
            ref: input => (vehicleOwnerInput.current = input),
            onSubmitEditing: () => {
              statusDropdown.current && statusDropdown.current.focus();
            }
            // blurOnSubmit: true,
          }}
        />

        <Dropdown
          label="Status"
          data={types.VEHICLE_STATUS}
          value={formState.values.status}
          ref={input => {
            statusDropdown.current = input;
          }}
          onChangeText={value => {
            inputChangeHandler("status", value);
          }}
          onFocus={statusDropdownFocusHandler.bind(this, true)}
          onBlur={statusDropdownFocusHandler.bind(this, false)}
          textColor={statusDropdownFocus ? Colors.primary : undefined}
          animationDuration={0}
          rippleDuration={0}
        />

        {drivers.length > 0 ? (
          <View style={{ paddingTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingBottom: 10
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Drivers</Text>
              <View style={{ paddingLeft: 8 }}>
                <IconButton
                  IconCmp={FontAwesome}
                  name="pencil"
                  size={22}
                  color={Colors.primary}
                  onPress={() => {
                    const prevSelected = formState.values.drivers.map(
                      d => d.id
                    );
                    navigation.navigate("DriverPicker", {
                      returnSelection: selected => {
                        const selectedDrivers = selected.map(id =>
                          drivers.find(d => d.id === id)
                        );
                        inputChangeHandler("drivers", selectedDrivers);
                      },
                      selected: prevSelected
                    });
                  }}
                />
              </View>
            </View>

            {drivers.map(driver => {
              return (
                <View
                  key={driver.id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10
                  }}
                >
                  <Text>{driver.name}</Text>
                </View>
              );
            })}
          </View>
        ) : null}

        <View style={styles.submitButton}>
          {isSaving ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <Button title="Save" color={Colors.primary} onPress={saveHandler} />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditVehicleDetailScreen.navigationOptions = navData => {
  const vehicleNum = navData.navigation.getParam("vehicleNum");
  const onDelete = navData.navigation.getParam("onDelete");

  const isEdit = !!vehicleNum;
  let nav = {
    headerTitle: isEdit ? vehicleUtils.displayFormat(vehicleNum) : "Add Vehicle"
  };

  if (isEdit) {
    nav.headerRight = (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-trash" : "ios-trash"}
          onPress={onDelete}
        />
      </HeaderButtons>
    );
  }

  return nav;
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
    height: "100%"
  },
  input: {
    paddingTop: 8
  },
  submitButton: {
    marginTop: 20,
    justifyContent: "center"
  }
});

export default EditVehicleDetailScreen;
