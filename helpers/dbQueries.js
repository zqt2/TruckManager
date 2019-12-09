export const CREATE_VEHICLE =
  "CREATE TABLE IF NOT EXISTS \
  vehicle\
  (\
    id INTEGER PRIMARY KEY NOT NULL,\
    number TEXT NOT NULL,\
    description TEXT DEFAULT '',\
    permit TEXT DEFAULT '',\
    owner TEXT DEFAULT '',\
    status TEXT DEFAULT '',\
    created DATETIME DEFAULT CURRENT_TIMESTAMP,\
    updated DATETIME DEFAULT CURRENT_TIMESTAMP\
  );";

export const VEHICLE_UPDATE_TIME =
  "CREATE TRIGGER IF NOT EXISTS vehicle_update_time \
      UPDATE OF description, permit, owner, status ON vehicle \
  BEGIN \
    UPDATE vehicle SET updated = CURRENT_TIMESTAMP WHERE id=NEW.id; \
  END;";

export const INSERT_VEHICLE =
  "INSERT INTO vehicle (number, description, permit, owner, status) VALUES (?, ?, ?, ?, ?);";

export const UPDATE_VEHICLE =
  "UPDATE vehicle SET description = ?, permit = ?, owner = ?, status = ? WHERE id = ?;";

export const CLEAR_VEHICLE_DRIVERS =
  "UPDATE driver SET vehicle_id = NULL WHERE vehicle_id = ?;";

export const SET_VEHICLE_DRIVERS =
  "UPDATE driver SET vehicle_id = ? WHERE id IN ?;";

export const DELETE_VEHICLE = "DELETE FROM vehicle WHERE id = ?;";

export const SELECT_VEHICLES = "SELECT * FROM vehicle ORDER BY updated DESC;";

export const SELECT_VEHICLE_BY_ID = "SELECT * FROM vehicle WHERE id = ?;";

export const CREATE_DRIVER =
  "CREATE TABLE IF NOT EXISTS \
  driver\
  (\
    id INTEGER PRIMARY KEY NOT NULL,\
    name TEXT NOT NULL,\
    phone TEXT DEFAULT '',\
    altPhone TEXT DEFAULT '',\
    profileImage TEXT DEFAULT '',\
    dl TEXT DEFAULT '',\
    dlImage TEXT DEFAULT '',\
    status TEXT DEFAULT '',\
    type TEXT DEFAULT '',\
    vehicle_id INTEGER DEFAULT NULL,\
    created DATETIME DEFAULT CURRENT_TIMESTAMP,\
    updated DATETIME DEFAULT CURRENT_TIMESTAMP,\
    FOREIGN KEY(vehicle_id) REFERENCES vehicle(id)\
  );";

export const DRIVER_UPDATE_TIME =
  "CREATE TRIGGER IF NOT EXISTS driver_update_time \
      UPDATE OF name, phone, altPhone, profileImage, \
      dl, dlImage, status, type, vehicle_id ON driver \
  BEGIN \
    UPDATE vehicle SET updated = CURRENT_TIMESTAMP WHERE id=OLD.id; \
  END;";

export const INSERT_DRIVER =
  "INSERT INTO driver (\
    name, phone, altPhone, profileImage, dl, dlImage, status, type, vehicle_id) \
    VALUES ( \
    ?, ?, ?, ?, ?, ?, ?, ?, ?);";

export const UPDATE_DRIVER =
  "UPDATE driver SET \
    name = ?, phone = ?, altPhone = ?, profileImage = ?,\
    dl = ?, dlImage = ?, status = ?, type = ? \
  WHERE id = ?;";

export const DELETE_DRIVER = "DELETE FROM vehicle WHERE id = ?;";

export const SELECT_DRIVERS =
  "SELECT \
  driver.id as driverId,\
  driver.name as name,\
  driver.phone as phone,\
  driver.altPhone as altPhone,\
  driver.profileImage as profileImage,\
  driver.dl as dl,\
  driver.dlImage as dlImage,\
  driver.status as driverStatus,\
  driver.type as driverType,\
  vehicle.id as vehicleId,\
  vehicle.number as vehicleNumber,\
  vehicle.description as vehicleDesc,\
  vehicle.permit as vehiclePermit,\
  vehicle.owner as vehicleOwner,\
  vehicle.status as vehicleStatus \
  FROM driver \
  LEFT OUTER JOIN vehicle ON driver.vehicle_id=vehicle.id \
  ORDER BY driver.updated DESC;";

export const SELECT_VEHICLE_DRIVERS =
  "SELECT * FROM driver WHERE vehicle_id = ?;";
