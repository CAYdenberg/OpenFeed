// @flow

export const getId = (record: Object): string => {
  const idField = record.id || record._id
  if (!idField) {
    throw new Error('Attempted to extract id from record without one')
  }

  const parts = idField.split('|')
  if (parts.length === 1) {
    return idField
  } else if (parts.length > 2) {
    return parts[2]
  } else {
    throw new Error(`Unable to interpret document id from ${idField}`)
  }
}

export const filterObject = (obj: Object, f: Function = (x => x)) => {
  if (!obj) return {}

  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key]
    if (f(value, key)) {
      acc[key] = value
    }
    return acc
  }, {})
}

export const filterObjectByKeys = (obj: Object, keys: Array<string>) =>
  filterObject(obj, (value, key) => keys.indexOf(key) !== -1)

export const excludeKeysFromObject = (obj: Object, keys: Array<string>) =>
  filterObject(obj, (value, key) => keys.indexOf(key) === -1)
