import { parseNumber, toAuto, toPercent } from "./index";

console.log(toAuto(1234));
console.log(toAuto(12345));
console.log(toAuto(123456789));

console.log(toAuto(1234, { fixed: 1 }));
console.log(toAuto(12345, { fixed: 1 }));
console.log(toAuto(123456789, { fixed: 2, space: " " }));
console.log(toAuto(12.3 * 10000 * 10000 * 10000, { fixed: 1, space: " " }));
console.log(toAuto(1.2, { fixed: 4, trimEndZeros: true }));

console.log(toPercent(0.1234, { fixed: 1, space: " " }));
console.log(toPercent(1.23456, { trimEndZeros: true }));
console.log(toPercent(1.9, { fixed: 4, trimEndZeros: true }));

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
console.log(parseNumber("abc")); // null
