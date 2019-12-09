import * as db from "../helpers/db";
import Vehicle from "../models/vehicle";
import Driver from "../models/driver";

export const SET_VEHICLES = "SET_VEHICLES";
export const ADD_VEHICLE = "ADD_VEHICLE";
export const UPDATE_VEHICLE = "UPDATE_VEHICLE";
export const DELETE_VEHICLE = "DELETE_VEHICLE";

const vehicleFromDb = dbVehicle => {
  const promise = new Promise((resolve, reject) => {
    db.selectVehicleDrivers(dbVehicle.id)
      .then(result => {
        const drivers = result.rows._array.map(
          driver =>
            new Driver(
              driver.id,
              driver.name,
              driver.phone,
              driver.altPhone,
              driver.profileImage,
              driver.dl,
              driver.dlImage,
              driver.status,
              driver.type
            )
        );
        const vehicle = new Vehicle(
          dbVehicle.id,
          dbVehicle.number,
          dbVehicle.description,
          dbVehicle.permit,
          dbVehicle.owner,
          dbVehicle.status,
          drivers
        );
        resolve(vehicle);
      })
      .catch(err => reject(err));
  });
  return promise;
};

export const setVehicles = () => {
  return async dispatch => {
    try {
      const result = await db.selectVehicles();
      Promise.all(result.rows._array.map(vehicleFromDb)).then(vehicles =>
        dispatch({ type: SET_VEHICLES, vehicles: vehicles })
      );
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };
};

export const addVehicle = vehicle => {
  return async dispatch => {
    try {
      const insertResult = await db.insertVehicle(vehicle);
      if (vehicle.drivers) {
        const driverIds = vehicle.drivers.map(driver => driver.id);
        await db.setVehicleDrivers(insertResult.insertId, driverIds);
      }
      const result = await db.selectVehicles();
      Promise.all(result.rows._array.map(vehicleFromDb)).then(vehicles =>
        dispatch({ type: SET_VEHICLES, vehicles: vehicles })
      );
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };
};

export const updateVehicle = vehicle => {
  return async dispatch => {
    try {
      await db.updateVehicle(vehicle);
      await db.clearVehicleDrivers(vehicle.id);
      if (vehicle.drivers) {
        const driverIds = vehicle.drivers.map(driver => driver.id);
        await db.setVehicleDrivers(vehicle.id, driverIds);
      }
      const result = await db.selectVehicles();
      Promise.all(result.rows._array.map(vehicleFromDb)).then(vehicles =>
        dispatch({ type: SET_VEHICLES, vehicles: vehicles })
      );
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };
};

export const deleteVehicle = id => {
  return async dispatch => {
    try {
      await db.clearVehicleDrivers(id);
      await db.deleteVehicle(id);
      const result = await db.selectVehicles();
      Promise.all(result.rows._array.map(vehicleFromDb)).then(vehicles =>
        dispatch({ type: SET_VEHICLES, vehicles: vehicles })
      );
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };
};
