type Options = {
  fixed?: number;
  space?: string;
};

export function toWan(value: number, { fixed = 0, space = "" }: Options = {}): string {
  return (value / 10000).toFixed(fixed) + space + "万";
}

export function toYi(value: number, { fixed = 0, space = "" }: Options = {}): string {
  return (value / 100000000).toFixed(fixed) + space + "亿";
}

export function toWanYi(value: number, { fixed = 0, space = "" }: Options = {}): string {
  return (value / 1000000000000).toFixed(fixed) + space + "万亿";
}

export function toAuto(value: number, { fixed = 0, space = "" }: Options = {}): string {
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

export function toPercent(value: number, { fixed = 0, space = "" }: Options = {}) {
  return (value * 100).toFixed(fixed) + space + "%";
}
