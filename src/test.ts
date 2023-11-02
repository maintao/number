import { toAuto, toPercent } from "./index";

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
