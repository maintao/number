"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
console.log((0, index_1.toAuto)(NaN)); // NaN
console.log((0, index_1.toAuto)(NaN, { nanString: "invalid" })); // invalid
console.log((0, index_1.toAuto)(1234)); // 1234
console.log((0, index_1.toAuto)(12345)); // 1万
console.log((0, index_1.toAuto)(123456789)); // 1亿
console.log((0, index_1.toAuto)(1234, { fixed: 1 })); // 1234.0
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
//# sourceMappingURL=test.js.map