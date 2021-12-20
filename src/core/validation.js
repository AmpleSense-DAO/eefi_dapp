export const toValidNumber = (value) => {
  var type;
  // 111,111,111.111
  if (/^(\d|(\d\d)|(\d\d\d))(\d*|(,\d\d\d)*)(\.[0-9]+)?$/.test(value)) {
    value = value.replace(/,/g, "");
    type = "en-US";
  }
  // 111.111.111,111
  else if (/^(\d|(\d\d)|(\d\d\d))(\d*|(\.\d\d\d)*)(,[0-9]+)?$/.test(value)) {
    value = value.replace(/\./g, "");
    value = value.replace(/,/g, ".");
    type = "de-DE";
  } else {
    alert("input is not validated.");
    return;
  }
  return { type: type, value: value };
};
export const toValidString = (value) => {
  var type = "en-US";
  var endType = "";
  if (value.slice(-1) === "." || value.slice(-1) === ",") {
    endType = value.slice(-1);
    value = value.slice(0, -1);
  }
  if (value === "") {
    return 0;
  }
  // 111,111,111.111
  else if (/^(\d)+(,\d+)*(\.\d+)?$/.test(value) && !(/\.[0-9]+$/.test(value) && endType === ",")) {
    // else if (/^(\d)+(\d*|(,\d\d\d)*)(,(\d|(\d\d)|(\d\d\d\d)))?(\.[0-9]+)?$/.test(value) && !(/\.[0-9]+$/.test(value) && endType === ",")) {
    value = value.replace(/,/g, "");
  }
  // 111.111.111,111
  else if (/^(\d)+(\.\d+)*(,[0-9]+)?$/.test(value) && !(/,[0-9]+$/.test(value) && endType === ".")) {
    // else if (/^(\d)+(\d*|(\.\d\d\d)*)(\.(\d|(\d\d)|(\d\d\d\d)))?(,[0-9]+)?$/.test(value) && !(/,\.[0-9]+$/.test(value) && endType === ".")) {
    value = value.replace(/\./g, "");
    value = value.replace(/,/g, ".");
    type = "de-DE";
  } else {
    alert("input is not validated.");
    return value;
  }
  var decimalPoint = type === "en-US" ? "." : ",";
  value = value.split(decimalPoint);
  return `${formatNumber(value[0], type)}${value[1] ? `${decimalPoint}${value[1]}` : ""}${endType}`;
};
const formatNumber = (value, type) => {
  var mid = ",";
  if (type === "en-DE") {
    mid = ".";
  }
  value = value[0] === "0" ? value.slice(1) : value;
  var result = "";
  for (let i = 0; i < value.length; i++) {
    result = `${value[value.length - i - 1]}${result}`;
    if (i % 3 === 2 && value.length > i + 1) {
      result = `${mid}${result}`;
    }
  }
  return result;
};
