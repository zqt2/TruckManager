import { SET_DRIVERS, ADD_DRIVER } from "./driver-actions";

const initialState = {
  drivers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DRIVERS:
      return {
        ...state,
        drivers: [...action.drivers]
      };
    case ADD_DRIVER:
      return {
        ...state,
        drivers: [...action.drivers]
      };
    default:
      return state;
  }
};
