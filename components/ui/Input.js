import React, { useReducer } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import * as vehicleUtils from "../../helpers/vehicleUtil";

const CHANGE = "CHANGE";
const FOCUS = "FOCUS";
const BLUR = "BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        value: action.text,
        isValid: action.isValid
      };
    case FOCUS:
      return {
        ...state,
        active: true
      };
    case BLUR:
      return {
        ...state,
        active: false
      };
    default:
      return state;
  }
};

const Input = props => {
  const {
    label,
    inputProps,
    initialValue,
    initiallyValid,
    errorMessage,
    onChange,
    style
  } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    active: false,
    value: !!initialValue ? initialValue : "",
    isValid: initiallyValid
  });

  const focusChangeHandler = focus => {
    dispatch({ type: focus ? FOCUS : BLUR });
  };

  const textChangeHandler = text => {
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.vehicleNum && !vehicleUtils.isValid(text)) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: CHANGE, text, isValid });
    onChange && onChange(text, isValid);
  };

  return (
    <View style={{ ...style }}>
      <Text
        style={inputState.active ? styles.activeLabel : styles.inactiveLabel}
      >
        {label}
      </Text>
      <TextInput
        {...inputProps}
        value={inputState.value}
        style={inputState.active ? styles.activeInput : styles.inactiveInput}
        onFocus={focusChangeHandler.bind(this, true)}
        onBlur={focusChangeHandler.bind(this, false)}
        onChangeText={textChangeHandler}
      />
      {!inputState.active && !inputState.isValid ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red"
  },
  activeLabel: {
    color: Colors.primary,
    fontSize: 12
  },
  inactiveLabel: {
    color: "#666",
    fontSize: 12
  },
  activeInput: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 0.5,
    fontSize: 16,
    paddingVertical: 5
  },
  inactiveInput: {
    borderBottomColor: "#666",
    borderBottomWidth: 0.5,
    fontSize: 16,
    paddingVertical: 5
  },
  errorText: {
    fontSize: 12,
    padding: 2,
    color: "rgba(255, 0, 0, 0.5)"
  }
});

export default Input;
