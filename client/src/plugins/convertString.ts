import type ConvertString from "@/types/ConvertString";

const convertString: ConvertString = (str, idx, seperator) => {
  if (str === undefined) {
    return "no-data";
  }
  if (str.split(seperator)[idx] === undefined) {
    return str;
  }
  return str.split(seperator)[idx];
};
export default convertString;
