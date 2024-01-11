"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumber = exports.toPercent = exports.toAuto = exports.toWanYi = exports.toYi = exports.toWan = exports.trimTrailingZeros = void 0;
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
function toWan(value, { fixed = 0, trimEndZeros = false, space = "" } = {}) {
    let ret = (value / 10000).toFixed(fixed);
    ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
    return ret + space + "万";
}
exports.toWan = toWan;
function toYi(value, { fixed = 0, trimEndZeros = false, space = "" } = {}) {
    let ret = (value / 100000000).toFixed(fixed);
    ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
    return ret + space + "亿";
}
exports.toYi = toYi;
function toWanYi(value, { fixed = 0, trimEndZeros = false, space = "" } = {}) {
    let ret = (value / 1000000000000).toFixed(fixed);
    ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
    return ret + space + "万亿";
}
exports.toWanYi = toWanYi;
function toAuto(value, { fixed = 0, trimEndZeros = false, space = "" } = {}) {
    const abs = Math.abs(value);
    if (abs < 10000) {
        let ret = value.toFixed(fixed);
        ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
        return ret;
    }
    if (abs < 100000000) {
        return toWan(value, { fixed, trimEndZeros, space });
    }
    if (abs < 1000000000000) {
        return toYi(value, { fixed, trimEndZeros, space });
    }
    return toWanYi(value, { fixed, trimEndZeros, space });
}
exports.toAuto = toAuto;
function toPercent(value, { fixed = 0, trimEndZeros = false, space = "" } = {}) {
    let ret = (value * 100).toFixed(fixed);
    ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
    return ret + space + "%";
}
exports.toPercent = toPercent;
function parseNumber(input) {
    // Remove whitespace
    input = input.trim();
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
        return isNaN(number) ? null : number / 100;
    }
    // Check for per mille
    if (input.endsWith("‰")) {
        const number = parseFloat(input.slice(0, -1));
        return isNaN(number) ? null : number / 1000;
    }
    // Check for suffixes (k, m, g, t)
    const suffixMatch = input.match(/([kmgbt万萬w亿])$/i);
    if (suffixMatch) {
        const number = parseFloat(input.slice(0, -1));
        return isNaN(number) ? null : handleSuffix(number, suffixMatch[0]);
    }
    // Check for scientific notation and other formats
    const number = parseFloat(input);
    return isNaN(number) ? null : number;
}
exports.parseNumber = parseNumber;
//# sourceMappingURL=index.js.map