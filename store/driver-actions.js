import * as db from "../helpers/db";
import Driver from "../models/driver";
import Vehicle from "../models/vehicle";

export const SET_DRIVERS = "SET_DRIVERS";
export const ADD_DRIVER = "ADD_DRIVER";

export const setDrivers = () => {
  return async dispatch => {
    try {
      const result = await db.selectDrivers();
      const drivers = result.rows._array.map(d => {
        const newDriver = new Driver(
          d.driverId,
          d.name,
          d.phone,
          d.altPhone,
          d.profileImage,
          d.dl,
          d.dlImage,
          d.driverStatus,
          d.driverType,
          !!d.vehicleId
            ? new Vehicle(
                d.vehicleId,
                d.vehicleNumber,
                d.vehicleType,
                d.vehiclePermit
              )
            : null
        );
        return newDriver;
      });
      dispatch({ type: SET_DRIVERS, drivers: drivers });
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };
};

export const addDriver = driver => {
  return async dispatch => {
    try {
      console.log("adding", driver);
      await db.insertDriver(
        driver.name,
        driver.phone,
        driver.altPhone,
        driver.photo,
        driver.dl,
        driver.dlImage,
        driver.status,
        driver.type,
        !!driver.vehicle ? driver.vehicle.id : null
      );
      const result = await db.selectDrivers();
      const drivers = result.rows._array.map(d => {
        const newDriver = new Driver(
          d.driverId,
          d.name,
          d.phone,
          d.altPhone,
          d.profileImage,
          d.dl,
          d.dlImage,
          d.status,
          d.type,
          !!d.vehicleId
            ? new Vehicle(
                d.vehicleId,
                d.vehicleNumber,
                d.vehicleType,
                d.vehiclePermit
              )
            : null
        );
        return newDriver;
      });
      dispatch({ type: ADD_DRIVER, drivers: drivers });
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };
};
