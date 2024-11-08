import { formatWithCommas, isNotNumber, isNumber, parseNumber, toAuto, toPercent } from "./index";

console.log(toAuto(1234)); // 1234
console.log(toAuto(12345)); // 1万
console.log(toAuto(123456789)); // 1亿

console.log(toAuto(1234, { fixed: 1 })); // 1234.0
console.log(toAuto(12345, { fixed: 1 })); // 1.2万
console.log(toAuto(12345, { wanFixed: 2 })); // 1.23万
console.log(toAuto(123456789, { fixed: 2, space: " " })); // 1.23 亿
console.log(toAuto(123456789, { yiFixed: 3, space: " " })); // 1.235 亿
console.log(toAuto(12.3 * 10000 * 10000 * 10000, { fixed: 1, space: " " })); // 12.3 万亿
console.log(toAuto(1.00002, { fixed: 1, trimEndZeros: true })); // 1

console.log(toPercent(0.1234, { fixed: 1, space: " " })); // 12.3 %
console.log(toPercent(1.23456, { trimEndZeros: true })); // 123%
console.log(toPercent(1.9, { fixed: 4, trimEndZeros: true })); // 190%

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
