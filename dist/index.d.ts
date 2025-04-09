type Options = {
    fixed?: number;
    wanFixed?: number;
    yiFixed?: number;
    wanYiFixed?: number;
    trimEndZeros?: boolean;
    nanString?: string;
    space?: string;
};
export declare function trimTrailingZeros(numberString: string): string;
export declare function toWan(value: any, { fixed, trimEndZeros, space, nanString, }?: Options): string;
export declare function toYi(value: any, { fixed, trimEndZeros, space, nanString, }?: Options): string;
export declare function toWanYi(value: any, { fixed, trimEndZeros, space, nanString, }?: Options): string;
export declare function toAuto(value: any, { fixed, wanFixed, yiFixed, wanYiFixed, trimEndZeros, space, nanString, }?: Options): string;
export declare function toPercent(value: any, { fixed, trimEndZeros, space, nanString, }?: Options): string;
export declare function parseNumber(input: any): number;
export declare function isNumber(value: any): boolean;
export declare function isNotNumber(value: any): boolean;
export declare function formatWithCommas(value: any, { strNaN }?: {
    strNaN: string;
}): string;
export declare function removeNumberCommas(str: string): string;
export declare function numberFallback(...args: any[]): number;
export {};
//# sourceMappingURL=index.d.ts.map