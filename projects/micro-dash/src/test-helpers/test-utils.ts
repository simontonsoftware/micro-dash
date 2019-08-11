import { isDate, isMap, isNumber, isString } from "lodash-es";

export function isA(value: any): value is "a" {
  return value === "a";
}

export function isDateOrString(value: any): value is Date | string {
  return isDate(value) || isString(value);
}

export function isNumberOrString(value: any): value is number | string {
  return isNumber(value) || isString(value);
}

export function isMapOrString(value: any): value is Map<any, any> | string {
  return isMap(value) || isString(value);
}

export function isStringOr2(value: any): value is string | 2 {
  return isString(value) || value === 2;
}

export function keyIsA(_: any, key: any): key is "a" {
  return key === "a";
}

export function keyIsC(_: any, key: any): key is "c" {
  return key === "c";
}

export function keyIsAorC(_: any, key: any): key is "a" | "c" {
  return key === "a" || key === "c";
}

export function keyIsString2(_: any, key: any): key is "2" {
  return key === "2";
}

export function keyIsString3(_: any, key: any): key is "3" {
  return key === "3";
}

export function keyIsAorNumber(_: any, key: any): key is "a" | number {
  return key === "a" || isNumber(key);
}

export function keyIsString(_: any, key: any): key is string {
  return isString(key);
}

export function keyIsNumber(_: any, key: any): key is number {
  return isNumber(key);
}
