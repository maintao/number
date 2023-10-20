type Options = {
    fixed?: number;
    space?: string;
};
export declare function toWan(value: number, { fixed, space }?: Options): string;
export declare function toYi(value: number, { fixed, space }?: Options): string;
export declare function toWanYi(value: number, { fixed, space }?: Options): string;
export declare function toAuto(value: number, { fixed, space }?: Options): string;
export declare function toPercent(value: number, { fixed, space }?: Options): string;
export {};
