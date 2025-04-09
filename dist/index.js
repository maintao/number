"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberFallback = exports.removeNumberCommas = exports.formatWithCommas = exports.isNotNumber = exports.isNumber = exports.parseNumber = exports.toPercent = exports.toAuto = exports.toWanYi = exports.toYi = exports.toWan = exports.trimTrailingZeros = void 0;
function trimTrailingZeros(numberString) {
    // Check if the string contains a decimal point
    if (numberString.includes(".")) {
        // Remove trailing zeros after a decimal point and the decimal point if necessary
        return numberString.replace(/(\.\d*?[1-9])0+$|\.0*$/, "$1");
    }
    // Return the original string if there is no decimal point
    return numberString;
}
exports.trimTrailingZeros = trimTrailingZeros;
function toWan(value, { fixed = 0, trimEndZeros = false, space = "", nanString = "NaN", } = {}) {
    value = parseNumber(value);
    if (isNaN(value)) {
        return nanString;
    }
    let ret = (value / 10000).toFixed(fixed);
    ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
    return ret + space + "万";
}
exports.toWan = toWan;
function toYi(value, { fixed = 0, trimEndZeros = false, space = "", nanString = "NaN", } = {}) {
    value = parseNumber(value);
    if (isNaN(value)) {
        return nanString;
    }
    let ret = (value / 100000000).toFixed(fixed);
    ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
    return ret + space + "亿";
}
exports.toYi = toYi;
function toWanYi(value, { fixed = 0, trimEndZeros = false, space = "", nanString = "NaN", } = {}) {
    value = parseNumber(value);
    if (isNaN(value)) {
        return nanString;
    }
    let ret = (value / 1000000000000).toFixed(fixed);
    ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
    return ret + space + "万亿";
}
exports.toWanYi = toWanYi;
function toAuto(value, { fixed = 0, wanFixed, yiFixed, wanYiFixed, trimEndZeros = false, space = "", nanString = "NaN", } = {}) {
    value = parseNumber(value);
    if (isNaN(value)) {
        return nanString;
    }
    const abs = Math.abs(value);
    if (abs < 10000) {
        let ret = value.toFixed(fixed);
        ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
        return ret;
    }
    if (abs < 100000000) {
        fixed = (isNumber(wanFixed) && wanFixed) || fixed;
        return toWan(value, { fixed, trimEndZeros, space });
    }
    if (abs < 1000000000000) {
        fixed = (isNumber(yiFixed) && yiFixed) || fixed;
        return toYi(value, { fixed, trimEndZeros, space });
    }
    fixed = (isNumber(wanYiFixed) && wanYiFixed) || fixed;
    return toWanYi(value, { fixed, trimEndZeros, space });
}
exports.toAuto = toAuto;
function toPercent(value, { fixed = 0, trimEndZeros = false, space = "", nanString = "NaN", } = {}) {
    value = parseNumber(value);
    if (isNaN(value)) {
        return nanString;
    }
    let ret = (value * 100).toFixed(fixed);
    ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
    return ret + space + "%";
}
exports.toPercent = toPercent;
function parseNumber(input) {
    if (typeof input === "number") {
        return input;
    }
    if (typeof input !== "string") {
        return NaN;
    }
    input = input.trim(); // Remove whitespace
    input = input.replace(/,/g, ""); // Remove commas
    // Define a helper function to handle suffixes
    const handleSuffix = (number, suffix) => {
        switch (suffix.toLowerCase()) {
            case "k":
                return number * 1e3;
            case "m":
                return number * 1e6;
            case "g":
            case "b":
                return number * 1e9;
            case "t":
                return number * 1e12;
            case "万":
            case "萬":
            case "w":
                return number * 1e4;
            case "亿":
                return number * 1e8;
            default:
                return number;
        }
    };
    // Check for percentage
    if (input.endsWith("%")) {
        const number = parseFloat(input.slice(0, -1));
        return isNaN(number) ? NaN : number / 100;
    }
    // Check for per mille
    if (input.endsWith("‰")) {
        const number = parseFloat(input.slice(0, -1));
        return isNaN(number) ? NaN : number / 1000;
    }
    // Check for suffixes (k, m, g, t)
    const suffixMatch = input.match(/([kmgbt万萬w亿])$/i);
    if (suffixMatch) {
        const number = parseFloat(input.slice(0, -1));
        return isNaN(number) ? NaN : handleSuffix(number, suffixMatch[0]);
    }
    // Check for scientific notation and other formats
    const number = parseFloat(input);
    return isNaN(number) ? NaN : number;
}
exports.parseNumber = parseNumber;
function isNumber(value) {
    return Number.isFinite(value);
}
exports.isNumber = isNumber;
function isNotNumber(value) {
    return !Number.isFinite(value);
}
exports.isNotNumber = isNotNumber;
function formatWithCommas(value, { strNaN } = { strNaN: "NaN" }) {
    const val = parseNumber(value);
    if (isNaN(val)) {
        return strNaN;
    }
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
exports.formatWithCommas = formatWithCommas;
function removeNumberCommas(str) {
    // 使用更严格的正则匹配千分位逗号
    // 匹配规则：逗号右侧必须是3的倍数的连续数字，直到遇到非数字字符或结尾
    return str.replace(/(?<=\d{1,3}),(?=(\d{3})+(?!\d))/g, "");
}
exports.removeNumberCommas = removeNumberCommas;
function numberFallback(...args) {
    for (const arg of args) {
        if (isNumber(arg)) {
            return arg;
        }
    }
    return NaN;
}
exports.numberFallback = numberFallback;
//# sourceMappingURL=index.js.map