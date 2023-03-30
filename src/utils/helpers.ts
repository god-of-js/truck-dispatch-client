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

export function aValueHasBeenChanged<T extends object>(source: T, formData: T) {
  if (!source) return false;
  const keys = Object.keys(source) as (keyof typeof formData)[];
  const formDataKeys = Object.keys(formData);

  if (keys.length !== formDataKeys.length) {
    return false;
  }

  for (let key of keys) {
    if (source[key] !== formData[key]) {
      return false;
    }
  }

  return true;
}

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

export function removeUneditedFields<T>(
  sourceObj: Record<string, any>,
  derivedObj: Record<string, any>,
): T {
  const editedFields = Object.keys(derivedObj).filter(
    (field: string) => derivedObj[field] !== sourceObj[field],
  );
  const newDerivedObj: Record<string, any> = {};
  editedFields.forEach((field) => (newDerivedObj[field] = derivedObj[field]));
  return newDerivedObj as T;
}

export function deepRootedToFormData(data: Record<string, any>): FormData {
  const formData = new FormData();

  function buildFormData(
    formData: FormData,
    data: Record<string, any> | Date | Blob | null,
    rootName?: string,
  ) {
    if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(data instanceof Blob)
    ) {
      Object.keys(data).forEach((key) => {
        buildFormData(
          formData,
          data[key],
          rootName ? `${rootName}.${key}` : key,
        );
      });
    } else {
      const value = data == null ? '' : data;
      if (value instanceof Date)
        throw new Error("Value of type Date can't be converted to formData");
      formData.append(rootName!, value);
    }
  }

  buildFormData(formData, data);

  return formData;
}

export function replaceEditedItem<T extends { _id: any }>(
  arr: T[],
  item: T,
): T[] {
  const currentTripIndex = arr.findIndex((arrItem) => arrItem._id === item._id);
  const data = [...arr];
  data[currentTripIndex] = item;

  return data;
}

export function generateReference() {
  const alphanumeric =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < 6; i++) {
    key += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
  }
  return key;
}

export function convertDate(dateToConvert: number) {
  const date = new Date(dateToConvert);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  const suffix = getNumberSuffix(dayOfMonth);

  return `${dayOfWeek}, ${month} ${dayOfMonth}${suffix} ${year}`;
}

export function saveTokenVerificationInfo(data: { pinId: string; to: string }) {
  localStorage.setItem('otp-pin-id', data.pinId);
  localStorage.setItem('otp-phone-number', data.to);
}

function getNumberSuffix(dayOfMonth: number) {
  if (dayOfMonth >= 11 && dayOfMonth <= 13) {
    return 'th';
  }
  switch (dayOfMonth % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
