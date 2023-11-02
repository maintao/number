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
export {};
