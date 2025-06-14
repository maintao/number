import {
  formatWithCommas,
  isNotNumber,
  isNumber,
  numberFallback,
  parseNumber,
  removeNumberCommas,
  toAuto,
  toChinese,
  toDigit,
  toPercent,
  toWan,
  toYi,
} from "./index";

console.log(toAuto(NaN)); // NaN
console.log(toAuto(NaN, { nanString: "invalid" })); // invalid
console.log(toAuto(1234)); // 1234
console.log(toAuto(12345)); // 1万
console.log(toWan(12345)); // 1.23万
console.log(toAuto(123456789)); // 1亿
console.log(toYi(123456789, { unit: "亿元" })); // 1亿元

console.log(toAuto(1234, { fixed: 1, withCommas: true })); // 1,234.0
console.log(toAuto(12345, { fixed: 1 })); // 1.2万
console.log(toAuto(12345, { wanFixed: 2 })); // 1.23万
console.log(toAuto(123456789, { fixed: 2, space: " " })); // 1.23 亿
console.log(toAuto(123456789, { yiFixed: 3, space: " " })); // 1.235 亿
console.log(toAuto(12.3 * 10000 * 10000 * 10000, { fixed: 1, space: " " })); // 12.3 万亿
console.log(toAuto(1.00002, { fixed: 1, trimEndZeros: true })); // 1

console.log(toPercent(0.1234, { fixed: 1, space: " " })); // 12.3 %
console.log(toPercent(1.23456, { trimEndZeros: true })); // 123%
console.log(toPercent(1.9, { fixed: 4, trimEndZeros: true })); // 190%
console.log(toPercent("1.2%", { fixed: 2, trimEndZeros: true })); // 1.2%
console.log(toPercent("1.2%", { fixed: 2 })); // 1.20%

// Example usage
console.log(parseNumber("50%")); // 0.5
console.log(parseNumber("1e3")); // 1000
console.log(parseNumber("  123  ")); // 123
console.log(parseNumber("100‰")); // 0.1
console.log(parseNumber("5k")); // 5000
console.log(parseNumber("3M")); // 3000000
console.log(parseNumber("2G")); // 2000000000
console.log(parseNumber("1t")); // 1000000000000
console.log(parseNumber("1万")); // 10000
console.log(parseNumber("1w")); // 10000
console.log(parseNumber("1亿")); // 100000000
console.log(parseNumber("abc")); // NaN
console.log(parseNumber("1,000,000")); // 1000000

console.log(isNumber(null)); // false
console.log(isNotNumber(null)); // true

console.log(formatWithCommas(12345.6789)); // 12,345.678,9
console.log(formatWithCommas("12345.6789")); // 12,345.678,9
console.log(formatWithCommas("123")); // 123
console.log(formatWithCommas("abc")); // "NaN"
console.log(formatWithCommas("abc", { strNaN: "" })); // ""

console.log(removeNumberCommas("123,456,789")); // 123456789
console.log(removeNumberCommas("1,23,456")); // 1,23456
console.log(removeNumberCommas(""));

console.log(numberFallback(1, 2, 3, "abc")); // 1
console.log(numberFallback(undefined, 2, 3, "abc")); // 2
console.log(numberFallback(null, 2, 3, "abc")); // 2
console.log(numberFallback(NaN, 2, 3, "abc")); // 2
console.log(numberFallback(0, 2, 3, "abc")); // 0

console.log(toDigit(1234567.89, { withCommas: true })); // 1,234,568
console.log(toDigit(-1234567.89, { withCommas: false, fixed: 1 })); // -1234567.9

// toChinese
console.log(toChinese(1234567890)); // 一十二亿三千四百五十六万七千八百九十
console.log(toChinese(1234567890, { uppercase: true })); // 壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾
console.log(toChinese(0)); // 零
console.log(toChinese(1, { uppercase: true })); // 壹
console.log(toChinese(NaN)); // NaN
console.log(toChinese(NaN, { nanString: "非数字" })); // 非数字
console.log(toChinese(123)); // "一百二十三"
console.log(toChinese(123, { uppercase: true })); // "壹佰贰拾叁"
console.log(toChinese(1005)); // "一千零五"
console.log(toChinese(-123)); // "负一百二十三"
