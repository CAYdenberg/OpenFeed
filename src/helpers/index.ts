interface PouchDoc {
  [key: string]: string | number | boolean | null | undefined;
  _id: string;
  _rev?: string;
  id?: string;
}

interface Generic {
  [key: string]: string | number | boolean | null | undefined;
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

export const filterObject = (obj: Generic, f: Function = Boolean) => {
  if (!obj) return {};

  return Object.keys(obj).reduce((acc: Generic, key: string) => {
    const value = obj[key];
    if (f(value, key)) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export const filterObjectByKeys = (obj: Generic, keys: string[]) =>
  filterObject(obj, (value: any, key: string) => keys.indexOf(key) !== -1);

export const excludeKeysFromObject = (obj: Generic, keys: string[]) =>
  filterObject(obj, (value: any, key: string) => keys.indexOf(key) === -1);
