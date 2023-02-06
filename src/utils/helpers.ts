import { AnyAction } from 'redux';

export function removeKeyValuePairsFromObject<T>(
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
