import { AnyAction } from 'redux';
import jwtDecode from 'jwt-decode';
import TokenVerificationData from 'types/TokenVerificationData';
import { userTypes } from './constants';

export function toAnyAction(func: unknown) {
  return func as AnyAction;
}

export function aValueHasBeenChanged<T extends object>(source: T, formData: T) {
  if (!source) return false;

  const editedData = removeUneditedFields(source, formData);
  return !!Object.keys(editedData).length;
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

export function priceWithTDPercent(amount: number | string) {
  const value = parseInt(`${amount}`);
  return value + tdPercentageWithVAT(value);
}

export function tdPercentage(amount: number | string, percent = 7) {
  let value = amount;
  if (typeof value === 'string') {
    value = parseInt(`${amount}`);
  }
  return Math.round((percent / 100) * value);
}

export function tdPercentageWithVAT(amount: number) {
  const valueToBeTaxedOn = tdPercentage(amount);
  return valueToBeTaxedOn + calculateVAT(valueToBeTaxedOn);
}

export function calculateVAT(amount: number): number {
  const vatRate = 0.075; // 7.5% VAT rate
  const vatAmount = amount * vatRate;
  return vatAmount;
}

export function nairaToKobo(amount: string | number) {
  let value = amount;
  if (typeof value === 'string') {
    value = parseInt(`${amount}`);
  }
  return value * 100;
}

function getEditedFieldsFromObject(
  source: Record<string, any>,
  formObj: Record<string, any>,
) {
  const obj: Record<string, unknown> = {};
  return Object.keys(formObj)
    .filter((key) => {
      return formObj[key] !== source[key];
    })
    .forEach((key) => {
      obj[key] = formObj[key];
    });
}

export function removeUneditedFields<T = Record<string, unknown>>(
  sourceObj: Record<string, any>,
  derivedObj: Record<string, any>,
): T {
  const editedFields = Object.keys(derivedObj).filter((field: string) => {
    return derivedObj[field] !== sourceObj[field];
  });
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

export function convertToFullDateWithTime(dateToConvert: number | string) {
  const date = new Date(dateToConvert);
  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

export function truncateText(text: string, length: number = 15) {
  if (text.length <= length) return text;
  return text.substr(0, length) + '...';
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

export function convertToDdMmmYYYYDateFormat(dateToConvert: string | number) {
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
export function getTime(time: string | number) {
  const date = new Date(time);

  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Add leading zero to minutes if needed
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes} ${period}`;
}

export function saveTokenVerificationInfo(data: TokenVerificationData) {
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

export function searchObjectsByField<T extends Record<string, any>>(
  arr: T[],
  searchInput: string,
  searchFields: string[],
): T[] {
  if (!Array.isArray(arr) || !searchInput.trim() || !searchFields.length) {
    return [];
  }

  const sanitizedInput = searchInput.trim().toLowerCase();
  return arr.filter((item) => {
    return searchFields?.some((field) => {
      const value = getFieldFromObject(item, field);
      if (typeof value === 'string') {
        const sanitizedValue = value.trim().toLowerCase();
        return sanitizedValue.includes(sanitizedInput);
      } else if (Array.isArray(value)) {
        return value.some((v: string) =>
          v.trim().toLowerCase().includes(sanitizedInput),
        );
      } else if (typeof value === 'object' && value !== null) {
        const sanitizedValue = JSON.stringify(value).toLowerCase();
        return sanitizedValue.includes(sanitizedInput);
      }
      return false;
    });
  });
}

function getFieldFromObject(obj: Record<string, any>, fieldPath: string): any {
  const fields = fieldPath.split('.');
  let value: Record<string, any> | undefined = obj;
  for (const field of fields) {
    if (value && typeof value === 'object' && field in value) {
      value = value[field];
    } else {
      value = undefined;
      break;
    }
  }
  return value;
}

export function containsOnlyNumbers(value: string) {
  return /^[0-9]+$/.test(value);
}

export function formatUserType(userType: (typeof userTypes)[number]) {
  if (!userType.includes('company')) {
    return userType;
  }

  if (userType === 'transportCompany') return 'transport company';

  return 'company';
}

export function decodeToken(token: string): { exp: number } | void {
  try {
    return jwtDecode(token);
  } catch (err) {
    return;
  }
}
export function isTokenValid(token: string) {
  const decodedToken = decodeToken(token);
  if (!decodedToken) return true;

  const tokenExpiration = decodedToken.exp;

  const currentTime = Math.floor(Date.now() / 1000);

  return tokenExpiration > currentTime;
}
