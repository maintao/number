"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPercent = exports.toAuto = exports.toWanYi = exports.toYi = exports.toWan = exports.trimTrailingZeros = void 0;
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
function toWan(value, { fixed = 2, trimEndZeros = false, space = "" } = {}) {
    let ret = (value / 10000).toFixed(fixed);
    ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
    return ret + space + "万";
}
exports.toWan = toWan;
function toYi(value, { fixed = 2, trimEndZeros = false, space = "" } = {}) {
    let ret = (value / 100000000).toFixed(fixed);
    ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
    return ret + space + "亿";
}
exports.toYi = toYi;
function toWanYi(value, { fixed = 2, trimEndZeros = false, space = "" } = {}) {
    let ret = (value / 1000000000000).toFixed(fixed);
    ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
    return ret + space + "万亿";
}
exports.toWanYi = toWanYi;
function toAuto(value, { fixed = 2, trimEndZeros = false, space = "" } = {}) {
    const abs = Math.abs(value);
    if (abs < 10000) {
        let ret = value.toString();
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
function toPercent(value, { fixed = 2, trimEndZeros = false, space = "" } = {}) {
    let ret = (value * 100).toFixed(fixed);
    ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
    return ret + space + "%";
}
exports.toPercent = toPercent;
