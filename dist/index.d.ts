type Options = {
    fixed?: number;
    wanFixed?: number;
    yiFixed?: number;
    wanYiFixed?: number;
    trimEndZeros?: boolean;
    nanString?: string;
    withCommas?: boolean;
    unit?: string;
    space?: string;
    uppercase?: boolean;
};
export declare function trimTrailingZeros(numberString: string): string;
export declare function toChinese(value: any, { nanString, uppercase }?: Options): string;
export declare function toDigit(value: any, { fixed, withCommas, trimEndZeros, nanString }: Options): any;
export declare function toWan(value: any, { fixed, withCommas, trimEndZeros, space, unit, nanString, }?: Options): string;
export declare function toYi(value: any, { fixed, withCommas, trimEndZeros, space, unit, nanString, }?: Options): string;
export declare function toWanYi(value: any, { fixed, withCommas, trimEndZeros, space, unit, nanString, }?: Options): string;
export declare function toAuto(value: any, { fixed, wanFixed, yiFixed, wanYiFixed, withCommas, trimEndZeros, space, nanString, }?: Options): string;
export declare function toPercent(value: any, { fixed, withCommas, trimEndZeros, space, unit, nanString, }?: Options): string;
export declare function parseNumber(input: any): number;
export declare function isNumber(value: any): boolean;
export declare function isNotNumber(value: any): boolean;
export declare function isNonNegativeInteger(value: any): boolean;
export declare function addCommas(value: string): string;
export declare function formatWithCommas(value: any, { strNaN }?: {
    strNaN: string;
}): string;
export declare function removeNumberCommas(str: string): string;
export declare function numberFallback(...args: any[]): number;
export declare function sum(...args: any[]): number;
export declare function min(...args: any[]): number;
export declare function max(...args: any[]): number;
/**
 * 安全的向上取整
 * @param num 待处理的数字
 * @param fixed 保留的小数位数（非负整数）
 * @returns 向上取整后的结果
 */
export declare function roundUp(num: number, fixed: number): number;
/**
 * 安全的向下取整
 * @param num 待处理的数字
 * @param fixed 保留的小数位数（非负整数）
 * @returns 向下取整后的结果
 */
export declare function roundDown(num: number, fixed: number): number;
/**
 * 安全的四舍五入
 * @param num 待处理的数字
 * @param fixed 保留的小数位数（非负整数）
 * @returns 四舍五入后的结果
 */
export declare function round(num: number, fixed: number): number;
/** 修正数字到安全精度范围 */
export declare function safe(num: number): number;
export {};
//# sourceMappingURL=index.d.ts.map