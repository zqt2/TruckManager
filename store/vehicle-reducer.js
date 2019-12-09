import {
  SET_VEHICLES,
  ADD_VEHICLE,
  UPDATE_VEHICLE,
  DELETE_VEHICLE
} from "./vehicle-actions";

const initialState = {
  vehicles: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_VEHICLES:
      return {
        ...state,
        vehicles: [...action.vehicles]
      };
    case ADD_VEHICLE:
      return {
        ...state,
        vehicles: [...action.vehicles]
      };
    case UPDATE_VEHICLE:
      return {
        ...state,
        vehicles: [...action.vehicles]
      };
    case DELETE_VEHICLE:
      return {
        ...state,
        vehicles: [...action.vehicles]
      };
    default:
      return state;
  }
};
