"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
console.log((0, index_1.toAuto)(NaN)); // NaN
console.log((0, index_1.toAuto)(NaN, { nanString: "invalid" })); // invalid
console.log((0, index_1.toAuto)(1234)); // 1234
console.log((0, index_1.toAuto)(12345)); // 1万
console.log((0, index_1.toWan)(12345)); // 1.23万
console.log((0, index_1.toAuto)(123456789)); // 1亿
console.log((0, index_1.toYi)(123456789, { unit: "亿元" })); // 1亿元
console.log((0, index_1.toAuto)(1234, { fixed: 1, withCommas: true })); // 1,234.0
console.log((0, index_1.toAuto)(12345, { fixed: 1 })); // 1.2万
console.log((0, index_1.toAuto)(12345, { wanFixed: 2 })); // 1.23万
console.log((0, index_1.toAuto)(123456789, { fixed: 2, space: " " })); // 1.23 亿
console.log((0, index_1.toAuto)(123456789, { yiFixed: 3, space: " " })); // 1.235 亿
console.log((0, index_1.toAuto)(12.3 * 10000 * 10000 * 10000, { fixed: 1, space: " " })); // 12.3 万亿
console.log((0, index_1.toAuto)(1.00002, { fixed: 1, trimEndZeros: true })); // 1
console.log((0, index_1.toPercent)(0.1234, { fixed: 1, space: " " })); // 12.3 %
console.log((0, index_1.toPercent)(1.23456, { trimEndZeros: true })); // 123%
console.log((0, index_1.toPercent)(1.9, { fixed: 4, trimEndZeros: true })); // 190%
console.log((0, index_1.toPercent)("1.2%", { fixed: 2, trimEndZeros: true })); // 1.2%
console.log((0, index_1.toPercent)("1.2%", { fixed: 2 })); // 1.20%
// Example usage
console.log((0, index_1.parseNumber)("50%")); // 0.5
console.log((0, index_1.parseNumber)("1e3")); // 1000
console.log((0, index_1.parseNumber)("  123  ")); // 123
console.log((0, index_1.parseNumber)("100‰")); // 0.1
console.log((0, index_1.parseNumber)("5k")); // 5000
console.log((0, index_1.parseNumber)("3M")); // 3000000
console.log((0, index_1.parseNumber)("2G")); // 2000000000
console.log((0, index_1.parseNumber)("1t")); // 1000000000000
console.log((0, index_1.parseNumber)("1万")); // 10000
console.log((0, index_1.parseNumber)("1w")); // 10000
console.log((0, index_1.parseNumber)("1亿")); // 100000000
console.log((0, index_1.parseNumber)("abc")); // NaN
console.log((0, index_1.parseNumber)("1,000,000")); // 1000000
console.log((0, index_1.isNumber)(null)); // false
console.log((0, index_1.isNotNumber)(null)); // true
console.log((0, index_1.formatWithCommas)(12345.6789)); // 12,345.678,9
console.log((0, index_1.formatWithCommas)("12345.6789")); // 12,345.678,9
console.log((0, index_1.formatWithCommas)("123")); // 123
console.log((0, index_1.formatWithCommas)("abc")); // "NaN"
console.log((0, index_1.formatWithCommas)("abc", { strNaN: "" })); // ""
console.log((0, index_1.removeNumberCommas)("123,456,789")); // 123456789
console.log((0, index_1.removeNumberCommas)("1,23,456")); // 1,23456
console.log((0, index_1.removeNumberCommas)(""));
console.log((0, index_1.numberFallback)(1, 2, 3, "abc")); // 1
console.log((0, index_1.numberFallback)(undefined, 2, 3, "abc")); // 2
console.log((0, index_1.numberFallback)(null, 2, 3, "abc")); // 2
console.log((0, index_1.numberFallback)(NaN, 2, 3, "abc")); // 2
console.log((0, index_1.numberFallback)(0, 2, 3, "abc")); // 0
console.log((0, index_1.toDigit)(1234567.89, { withCommas: true })); // 1,234,568
console.log((0, index_1.toDigit)(-1234567.89, { withCommas: false, fixed: 1 })); // -1234567.9
// toChinese
console.log((0, index_1.toChinese)(1234567890)); // 一十二亿三千四百五十六万七千八百九十
console.log((0, index_1.toChinese)(1234567890, { uppercase: true })); // 壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾
console.log((0, index_1.toChinese)(0)); // 零
console.log((0, index_1.toChinese)(1, { uppercase: true })); // 壹
console.log((0, index_1.toChinese)(NaN)); // NaN
console.log((0, index_1.toChinese)(NaN, { nanString: "非数字" })); // 非数字
console.log((0, index_1.toChinese)(123)); // "一百二十三"
console.log((0, index_1.toChinese)(123, { uppercase: true })); // "壹佰贰拾叁"
console.log((0, index_1.toChinese)(1005)); // "一千零五"
console.log((0, index_1.toChinese)(-123)); // "负一百二十三"
// sum
console.log((0, index_1.sum)(1, 2, 3, "abc")); // 6
console.log((0, index_1.sum)(1, 2, 3, "abc", NaN)); // 6
console.log((0, index_1.sum)(1, 2, 3, "abc", NaN, undefined, null, "", "1")); // 7
// min
console.log((0, index_1.min)(1, 2, 3, "abc")); // 1
console.log((0, index_1.min)(1, 2, 3, "abc", NaN)); // 1
console.log((0, index_1.min)(1, 2, 3, "abc", NaN, undefined, null, "", "1")); // 1
// max
console.log((0, index_1.max)(1, 2, 3, "abc")); // 3
console.log((0, index_1.max)(1, 2, 3, "abc", NaN)); // 3
console.log((0, index_1.max)(1, 2, 3, "abc", NaN, undefined, null, "", "1")); // 3
console.log("round:", (0, index_1.round)(2.12345, 4)); // 2.1235
console.log("roundUp:", (0, index_1.roundUp)(0.1 + 0.2, 1)); // 0.3
console.log("roundUp:", (0, index_1.roundUp)(0.30000000000000004, 1)); // 0.3
console.log("roundDown:", (0, index_1.roundDown)(0.30000000000000004, 1)); // 0.3
console.log("round:", (0, index_1.round)(0.300000000005, 11)); // 0.30000000001
console.log("roundDown:", (0, index_1.roundDown)(100000 * 0.0783, 0)); // 7830
console.log("roundDown:", (0, index_1.roundUp)(100000 * 0.0783, 0)); // 7830
console.log("roundDown", (0, index_1.roundDown)(2.999999999999998, 0)); // 3
//# sourceMappingURL=test.js.map