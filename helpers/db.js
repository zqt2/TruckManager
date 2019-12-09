import * as SQLite from "expo-sqlite";
import * as dbQueries from "./dbQueries";

const db = SQLite.openDatabase("VehicleManager.db");

export const executeSql = (statement, args) => {
  args = !!args ? args : [];
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        statement,
        args,
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
      console.log("[DB]: Foreign keys turned on")
    );

    executeSql(dbQueries.CREATE_VEHICLE)
      .then(() =>
        executeSql(dbQueries.VEHICLE_UPDATE_TIME)
          .then(() =>
            executeSql(dbQueries.CREATE_DRIVER)
              .then(() =>
                executeSql(dbQueries.DRIVER_UPDATE_TIME)
                  .then(() => resolve())
                  .catch(err => reject(err))
              )
              .catch(err => reject(err))
          )
          .catch(err => reject(err))
      )
      .catch(err => reject(err));
  });
  return promise;
};

export const insertVehicle = vehicle => {
  console.log(vehicle);
  const promise = executeSql(dbQueries.INSERT_VEHICLE, [
    vehicle.number,
    vehicle.description,
    vehicle.permit,
    vehicle.owner,
    vehicle.status
  ]);
  return promise;
};

export const updateVehicle = vehicle => {
  const promise = executeSql(dbQueries.UPDATE_VEHICLE, [
    vehicle.description,
    vehicle.permit,
    vehicle.owner,
    vehicle.status,
    vehicle.id
  ]);
  return promise;
};

export const clearVehicleDrivers = vehicleId => {
  executeSql(dbQueries.CLEAR_VEHICLE_DRIVERS, [vehicleId]);
};

export const setVehicleDrivers = (vehicleId, driverIds) => {
  executeSql(dbQueries.SET_VEHICLE_DRIVERS, [vehicleId, driverIds]);
};

export const deleteVehicle = vehicleId => {
  const promise = executeSql(dbQueries.DELETE_VEHICLE, [vehicleId]);
  return promise;
};

export const selectVehicleById = id => {
  const promise = executeSql(dbQueries.SELECT_VEHICLE_BY_ID, [id]);
  return promise;
};

export const selectVehicles = () => {
  const promise = executeSql(dbQueries.SELECT_VEHICLES);
  return promise;
};

export const selectDrivers = () => {
  const promise = executeSql(dbQueries.SELECT_DRIVERS);
  return promise;
};

export const selectVehicleDrivers = id => {
  const promise = executeSql(dbQueries.SELECT_VEHICLE_DRIVERS, [id]);
  return promise;
};

export const insertDriver = (
  name,
  phone,
  altPhone,
  profileImage,
  dl,
  dlImage,
  status,
  type,
  vehicle_id
) => {
  const promise = executeSql(dbQueries.INSERT_DRIVER, [
    name,
    phone,
    altPhone,
    profileImage,
    dl,
    dlImage,
    status,
    type,
    vehicle_id
  ]);
  return promise;
};
