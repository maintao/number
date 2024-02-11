type Options = {
  fixed?: number;
  trimEndZeros?: boolean;
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
  value: number,
  { fixed = 0, trimEndZeros = false, space = "" }: Options = {}
): string {
  let ret = (value / 10000).toFixed(fixed);
  ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
  return ret + space + "万";
}

export function toYi(
  value: number,
  { fixed = 0, trimEndZeros = false, space = "" }: Options = {}
): string {
  let ret = (value / 100000000).toFixed(fixed);
  ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
  return ret + space + "亿";
}

export function toWanYi(
  value: number,
  { fixed = 0, trimEndZeros = false, space = "" }: Options = {}
): string {
  let ret = (value / 1000000000000).toFixed(fixed);
  ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
  return ret + space + "万亿";
}

export function toAuto(
  value: number,
  { fixed = 0, trimEndZeros = false, space = "" }: Options = {}
): string {
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

export function toPercent(
  value: number,
  { fixed = 0, trimEndZeros = false, space = "" }: Options = {}
) {
  let ret = (value * 100).toFixed(fixed);
  ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
  return ret + space + "%";
}

export function parseNumber(input: string): number | null {
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

export function isNumber(value: any): boolean {
  return Number.isFinite(value);
}

export function isNotNumber(value: any): boolean {
  return !Number.isFinite(value);
}
