type Options = {
    fixed?: number;
    trimEndZeros?: boolean;
    space?: string;
};
export declare function trimTrailingZeros(numberString: string): string;
export declare function toWan(value: number, { fixed, trimEndZeros, space }?: Options): string;
export declare function toYi(value: number, { fixed, trimEndZeros, space }?: Options): string;
export declare function toWanYi(value: number, { fixed, trimEndZeros, space }?: Options): string;
export declare function toAuto(value: number, { fixed, trimEndZeros, space }?: Options): string;
export declare function toPercent(value: number, { fixed, trimEndZeros, space }?: Options): string;
export declare function parseNumber(input: string): number;
export declare function isNumber(value: any): boolean;
export declare function isNotNumber(value: any): boolean;
export declare function formatWithCommas(value: number | string): string;
export {};
//# sourceMappingURL=index.d.ts.map