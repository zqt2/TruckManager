const VEHICLE_NUM_REGEXP = new RegExp(
  "[a-zA-Z]{2}[0-9]{2}[a-zA-Z]{0,2}[0-9]{4}"
);

export const isValid = number => {
  return VEHICLE_NUM_REGEXP.test(number);
};

export const dbFormat = number => {
  const formatted = !!number ? number.replace(/\s/g, "").toUpperCase() : "";
  return formatted;
};

export const displayFormat = number => {
  const dbFormatted = dbFormat(number);
  const numObj = toObject(dbFormatted);
  return (
    numObj.state +
    "" +
    numObj.district +
    " " +
    numObj.numPrefix +
    "" +
    numObj.num
  );
};

export const toObject = number => {
  const state = number.slice(0, 2);
  const district = number.slice(2, 4);
  const numPrefix = number.slice(4, number.length - 4);
  const num = number.slice(number.length - 4);

  return {
    state,
    district,
    numPrefix,
    num
  };
};
