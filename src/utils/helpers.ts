import { AnyAction } from 'redux';
import TokenVerificationData from 'types/TokenVerificationData';

export function toAnyAction(func: unknown) {
  return func as AnyAction;
}

export function aValueHasBeenChanged<T extends object>(source: T, formData: T) {
  if (!source) return false;
  // refactor to make use of the removeUneditedFields util
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
  ],
) {
  for (let i = 0; i < ranges.length; i++) {
    if (num >= ranges[i].divider) {
      const decimals = num % ranges[i].divider ? 2 : 0;
      const abbreviation = (num / ranges[i].divider).toFixed(decimals);
      const suffix = ranges[i].suffix;

      if (abbreviation.includes('.')) {
        // Remove trailing zeros
        return abbreviation.replace(/\.?0*$/, '') + suffix;
      }

      return abbreviation + suffix;
    }
  }

  // If the number is below the lowest range, add comma separators
  return num.toLocaleString();
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

export function removeUneditedFields<T = Record<string, unknown>>(
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
/**
 *
 * @param arr: Array of items
 * @param item: updated item that could potentially have a duplicate in the store
 * @returns returnArr: An updated arr that has either replaced the item or put it in if it's not in there.
 */
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

export function convertToFullDate(dateToConvert: number | string) {
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

export function convertToDdMmmYYYYDateFormat(dateToConvert: string) {
  const inputDate = dateToConvert;

  const date = new Date(inputDate);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function saveTokenVerificationInfo(data: TokenVerificationData) {
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
/**
 * This function can be used for filters e.g the nav filter on the TopNav.
 * @param
 * field: string; The field param takes the field been used for the filter.
 * @param
 * value: The value param sends the value of the filter, e.g. if the filter currently selected is by Company, then the value would be company or similar.
 * @param
 * data: this would be the array that would be filtered to give what we want.
 */
export function filterByFieldInObject<T = any>(
  field: string,
  value: string,
  data: any[],
): T[] {
  return data.filter((item) => {
    const fieldParts = field.split('.');

    if (fieldParts.length === 1) {
      // Base case: Field is not nested
      return item[field] === value;
    }

    // Recursive case: Field is nested
    const [currentField, ...remainingFields] = fieldParts;
    const nestedItem = item[currentField];

    if (nestedItem) {
      return (
        filterByFieldInObject<T>(remainingFields.join('.'), value, [nestedItem])
          .length > 0
      );
    }

    return false;
  }) as T[];
}

type ObjectFields = {
  [key: string]: any;
};

export function searchObjects(objects: ObjectFields[], searchFields: string[]): ObjectFields | undefined {
  for (const obj of objects) {
    let match = true;

    for (const field of searchFields) {
      if (!(field in obj)) {
        match = false;
        break;
      }
    }

    if (match) {
      return obj;
    }
  }

  return undefined;
}
