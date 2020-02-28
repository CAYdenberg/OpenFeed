interface PouchDoc {
  [key: string]: string | number | boolean | null | undefined;
  _id: string;
  _rev?: string;
  id?: string;
}

export const getId = (record: PouchDoc): string => {
  const idField = record.id || record._id;
  if (!idField) {
    throw new Error('Attempted to extract id from record without one');
  }

  const parts = idField.split('|');
  if (parts.length === 1) {
    return idField;
  } else if (parts.length > 2) {
    return parts[2];
  } else {
    throw new Error(`Unable to interpret document id from ${idField}`);
  }
};

export const determineFeedId = (url: string): string => {
  const normalizedUrl =
    url.charAt(url.length - 1) === '/' ? url.substring(0, url.length - 1) : url;
  return `pheed|feed|${normalizedUrl}`;
};

export const filterObject = (
  obj: { [key: string]: any },
  f: (value: any, key: string) => boolean = Boolean
) => {
  if (!obj) return {};

  return Object.keys(obj).reduce((acc, key: string) => {
    const value = obj[key];
    if (f(value, key)) {
      acc[key] = value;
    }
    return acc;
  }, new Object() as { [key: string]: any });
};

export const filterObjectByKeys = (
  obj: { [key: string]: any },
  keys: string[]
) => filterObject(obj, (value: any, key: string) => keys.indexOf(key) !== -1);

export const excludeKeysFromObject = (
  obj: { [key: string]: any },
  keys: string[]
) => filterObject(obj, (value: any, key: string) => keys.indexOf(key) === -1);

export const mergeArrays = <T>(compare: (a: T, b: T) => number) => (
  oldItems: T[],
  newItems: T[]
) => {
  return newItems.reduce((acc, newItem) => {
    const indexOfInsertion = acc.findIndex(
      oldItem => compare(oldItem, newItem) > 0
    );
    if (indexOfInsertion === -1) {
      return [...acc, newItem];
    }
    return [
      ...acc.slice(0, indexOfInsertion),
      newItem,
      ...acc.slice(indexOfInsertion),
    ];
  }, oldItems);
};

export const applyPush = <T>(newItem: T) => (initialState: T[]): T[] => {
  if (initialState.includes(newItem)) return initialState;
  return [newItem, ...initialState];
};
