type Options = {
  fixed?: number;
  wanFixed?: number;
  yiFixed?: number;
  wanYiFixed?: number;
  trimEndZeros?: boolean;
  nanString?: string;
  space?: string;
};

export function trimTrailingZeros(numberString: string): string {
  // Check if the string contains a decimal point
  if (numberString.includes(".")) {
    // Remove trailing zeros after a decimal point and the decimal point if necessary
    return numberString.replace(/(\.\d*?[1-9])0+$|\.0*$/, "$1");
  }
  // Return the original string if there is no decimal point
  return numberString;
}

export function toWan(
  value: any,
  {
    fixed = 0,
    trimEndZeros = false,
    space = "",
    nanString = "NaN",
  }: Options = {}
): string {
  value = parseNumber(value);
  if (isNaN(value)) {
    return nanString;
  }
  let ret = (value / 10000).toFixed(fixed);
  ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
  return ret + space + "万";
}

export function toYi(
  value: any,
  {
    fixed = 0,
    trimEndZeros = false,
    space = "",
    nanString = "NaN",
  }: Options = {}
): string {
  value = parseNumber(value);
  if (isNaN(value)) {
    return nanString;
  }
  let ret = (value / 100000000).toFixed(fixed);
  ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
  return ret + space + "亿";
}

export function toWanYi(
  value: any,
  {
    fixed = 0,
    trimEndZeros = false,
    space = "",
    nanString = "NaN",
  }: Options = {}
): string {
  value = parseNumber(value);
  if (isNaN(value)) {
    return nanString;
  }
  let ret = (value / 1000000000000).toFixed(fixed);
  ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
  return ret + space + "万亿";
}

export function toAuto(
  value: any,
  {
    fixed = 0,
    wanFixed,
    yiFixed,
    wanYiFixed,
    trimEndZeros = false,
    space = "",
    nanString = "NaN",
  }: Options = {}
): string {
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

export function toPercent(
  value: any,
  {
    fixed = 0,
    trimEndZeros = false,
    space = "",
    nanString = "NaN",
  }: Options = {}
): string {
  value = parseNumber(value);
  if (isNaN(value)) {
    return nanString;
  }
  let ret = (value * 100).toFixed(fixed);
  ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
  return ret + space + "%";
}

export function parseNumber(input: any): number {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input !== "string") {
    return NaN;
  }

  input = input.trim(); // Remove whitespace
  input = input.replace(/,/g, ""); // Remove commas

  // Define a helper function to handle suffixes
  const handleSuffix = (number: number, suffix: string): number => {
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

export function isNumber(value: any): boolean {
  return Number.isFinite(value);
}

export function isNotNumber(value: any): boolean {
  return !Number.isFinite(value);
}

export function formatWithCommas(
  value: any,
  { strNaN } = { strNaN: "NaN" }
): string {
  const val = parseNumber(value);
  if (isNaN(val)) {
    return strNaN;
  }
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function removeNumberCommas(str: string): string {
  // 使用更严格的正则匹配千分位逗号
  // 匹配规则：逗号右侧必须是3的倍数的连续数字，直到遇到非数字字符或结尾
  return str.replace(/(?<=\d{1,3}),(?=(\d{3})+(?!\d))/g, "");
}

export function numberFallback(...args: any[]): number {
  for (const arg of args) {
    if (isNumber(arg)) {
      return arg;
    }
  }
  return NaN;
}
