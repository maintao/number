"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPercent = exports.toAuto = exports.toWanYi = exports.toYi = exports.toWan = void 0;
function toWan(value, { fixed = 0, space = "" } = {}) {
    return (value / 10000).toFixed(fixed) + space + "万";
}
exports.toWan = toWan;
function toYi(value, { fixed = 0, space = "" } = {}) {
    return (value / 100000000).toFixed(fixed) + space + "亿";
}
exports.toYi = toYi;
function toWanYi(value, { fixed = 0, space = "" } = {}) {
    return (value / 1000000000000).toFixed(fixed) + space + "万亿";
}
exports.toWanYi = toWanYi;
function toAuto(value, { fixed = 0, space = "" } = {}) {
    const abs = Math.abs(value);
    if (abs < 10000) {
        return value.toString();
    }
    if (abs < 100000000) {
        return toWan(value, { fixed, space });
    }
    if (abs < 1000000000000) {
        return toYi(value, { fixed, space });
    }
    return toWanYi(value, { fixed, space });
}
exports.toAuto = toAuto;
function toPercent(value, { fixed = 0, space = "" } = {}) {
    return (value * 100).toFixed(fixed) + space + "%";
}
exports.toPercent = toPercent;
