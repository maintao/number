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

function format(
  value: string,
  {
    withCommas = false,
    trimEndZeros = false,
    space,
    unit,
  }: { withCommas?: boolean; trimEndZeros?: boolean; space?: string; unit?: string }
) {
  let ret = value;
  ret = trimEndZeros ? trimTrailingZeros(ret) : ret;
  ret = withCommas ? addCommas(ret) : ret;
  ret = space ? ret + space : ret;
  ret = unit ? ret + unit : ret;
  return ret;
}

export function trimTrailingZeros(numberString: string): string {
  // Check if the string contains a decimal point
  if (numberString.includes(".")) {
    // Remove trailing zeros after a decimal point and the decimal point if necessary
    return numberString.replace(/(\.\d*?[1-9])0+$|\.0*$/, "$1");
  }
  // Return the original string if there is no decimal point
  return numberString;
}

export function toChinese(value: any, { nanString = "NaN", uppercase = false }: Options = {}) {
  const parsedValue = parseNumber(value);
  if (isNaN(parsedValue) || !Number.isInteger(parsedValue)) {
    return nanString;
  }

  const num = Math.floor(parsedValue);

  if (num === 0) {
    return uppercase ? "零" : "零";
  }

  const isNegative = num < 0;
  const absNum = Math.abs(num);

  // 中文数字字符映射
  const digits = uppercase
    ? ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]
    : ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

  const units = uppercase ? ["", "拾", "佰", "仟"] : ["", "十", "百", "千"];

  const bigUnits = ["", "万", "亿", "万亿"];

  // 将数字按万进制分组（每4位一组）
  function convertGroup(n: number): string {
    if (n === 0) return "";

    let result = "";
    let needZero = false;

    for (let i = 3; i >= 0; i--) {
      const unit = Math.pow(10, i);
      const digit = Math.floor(n / unit);
      n %= unit;

      if (digit > 0) {
        if (needZero) {
          result += digits[0]; // 添加"零"
        }
        result += digits[digit];
        if (i > 0) {
          result += units[i];
        }
        needZero = false;
      } else if (result && n > 0) {
        needZero = true;
      }
    }

    return result;
  }

  // 按万进制分组处理
  const groups: number[] = [];
  let tempNum = absNum;
  while (tempNum > 0) {
    groups.push(tempNum % 10000);
    tempNum = Math.floor(tempNum / 10000);
  }

  let result = "";
  let hasValue = false;

  for (let i = groups.length - 1; i >= 0; i--) {
    const groupValue = groups[i];
    if (groupValue > 0) {
      const groupStr = convertGroup(groupValue);
      if (groupStr) {
        // 处理"一十"的特殊情况
        if (i === 0 && groupValue >= 10 && groupValue < 20 && !uppercase) {
          result += groupStr.replace(/^一十/, "十");
        } else {
          result += groupStr;
        }

        if (i > 0) {
          result += bigUnits[i];
        }
        hasValue = true;
      }
    } else if (hasValue && i > 0) {
      // 需要添加零
      let needZero = false;
      for (let j = i - 1; j >= 0; j--) {
        if (groups[j] > 0) {
          needZero = true;
          break;
        }
      }
      if (needZero) {
        result += digits[0];
      }
    }
  }

  return isNegative ? "负" + result : result;
}

export function toDigit(
  value: any,
  { fixed = 0, withCommas = false, trimEndZeros = false, nanString = "NaN" }: Options
) {
  value = parseNumber(value);
  if (isNaN(value)) {
    return nanString;
  }
  let ret = value.toFixed(fixed);
  ret = format(ret, { withCommas, trimEndZeros });
  return ret;
}

export function toWan(
  value: any,
  {
    fixed = 0,
    withCommas = false,
    trimEndZeros = false,
    space = "",
    unit = "万",
    nanString = "NaN",
  }: Options = {}
): string {
  value = parseNumber(value);
  if (isNaN(value)) {
    return nanString;
  }
  let ret = (value / 10000).toFixed(fixed);
  ret = format(ret, { withCommas, trimEndZeros, space, unit });
  return ret;
}

export function toYi(
  value: any,
  {
    fixed = 0,
    withCommas = false,
    trimEndZeros = false,
    space = "",
    unit = "亿",
    nanString = "NaN",
  }: Options = {}
): string {
  value = parseNumber(value);
  if (isNaN(value)) {
    return nanString;
  }
  let ret = (value / 100000000).toFixed(fixed);
  ret = format(ret, { withCommas, trimEndZeros, space, unit });
  return ret;
}

export function toWanYi(
  value: any,
  {
    fixed = 0,
    withCommas = false,
    trimEndZeros = false,
    space = "",
    unit = "万亿",
    nanString = "NaN",
  }: Options = {}
): string {
  value = parseNumber(value);
  if (isNaN(value)) {
    return nanString;
  }
  let ret = (value / 1000000000000).toFixed(fixed);
  ret = format(ret, { withCommas, trimEndZeros, space, unit });
  return ret;
}

export function toAuto(
  value: any,
  {
    fixed = 0,
    wanFixed,
    yiFixed,
    wanYiFixed,
    withCommas = false,
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
    ret = format(ret, { withCommas, trimEndZeros });
    return ret;
  }
  if (abs < 100000000) {
    fixed = (isNumber(wanFixed) && wanFixed) || fixed;
    return toWan(value, { fixed, withCommas, trimEndZeros, space });
  }
  if (abs < 1000000000000) {
    fixed = (isNumber(yiFixed) && yiFixed) || fixed;
    return toYi(value, { fixed, withCommas, trimEndZeros, space });
  }
  fixed = (isNumber(wanYiFixed) && wanYiFixed) || fixed;
  return toWanYi(value, { fixed, withCommas, trimEndZeros, space });
}

export function toPercent(
  value: any,
  {
    fixed = 0,
    withCommas = false,
    trimEndZeros = false,
    space = "",
    unit = "%",
    nanString = "NaN",
  }: Options = {}
): string {
  value = parseNumber(value);
  if (isNaN(value)) {
    return nanString;
  }
  let ret = (value * 100).toFixed(fixed);
  ret = format(ret, { withCommas, trimEndZeros, space, unit });
  return ret;
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

export function addCommas(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatWithCommas(value: any, { strNaN } = { strNaN: "NaN" }): string {
  const val = parseNumber(value);
  if (isNaN(val)) {
    return strNaN;
  }
  return addCommas(val.toString());
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
