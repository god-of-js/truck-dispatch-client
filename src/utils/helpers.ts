import { AnyAction } from 'redux';

export function removeKeyValuePairsFromObject<T extends Object>(
  obj: T,
  stringToBeRemoved: string[],
): T {
  const refinedObj: Record<string, unknown> = {};
  Object.keys(obj)
    .filter((key) => !stringToBeRemoved.includes(key))
    .forEach((key) => {
      refinedObj[key] = obj[key as keyof T];
    });
  return refinedObj as T;
}

export function toAnyAction(func: unknown) {
  return func as AnyAction;
}

export function aValueHasBeenChanged<T = unknown>(source: T, formData: T) {
  if (!source) return false;
  const bidKeys = Object.keys(source) as (keyof typeof formData)[];
  const formDataKeys = Object.keys(formData);

  if (bidKeys.length !== formDataKeys.length) {
    return false;
  }

  for (let key of bidKeys) {
    if (source[key] !== formData[key]) {
      return false;
    }
  }

  return true;}
export function abbreviateNumber(
  num: number,
  ranges = [
    { divider: 1e18, suffix: 'E' },
    { divider: 1e15, suffix: 'P' },
    { divider: 1e12, suffix: 'T' },
    { divider: 1e9, suffix: 'B' },
    { divider: 1e6, suffix: 'M' },
    { divider: 1e3, suffix: 'K' },
  ],
) {
  for (let i = 0; i < ranges.length; i++) {
    if (num >= ranges[i].divider) {
      const decimals = num % ranges[i].divider ? 2 : 0;
      return (num / ranges[i].divider).toFixed(decimals) + ranges[i].suffix;
    }
  }
  return num.toString();
}

export function priceWithTDPercent(amount: number | string, percent = 7) {
  const value = parseInt(`${amount}`);
  return value + tdPercentage(amount);
}

export function tdPercentage(amount: number | string, percent = 7) {
  let value = amount;
  if (typeof value === 'string') {
    value = parseInt(`${amount}`);
  }
  return Math.round((percent / 100) * value);
}

export function nairaToKobo(amount: string | number) {
  let value = amount;
  if (typeof value === 'string') {
    value = parseInt(`${amount}`);
  }
  return value * 100;
}
