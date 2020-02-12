import deepFreeze from 'deep-freeze';
import {
  getId,
  determineFeedId,
  filterObject,
  filterObjectByKeys,
  mergeArrays,
  applyPush,
} from '../index';

describe('getId', () => {
  it('should return the id, if available', () => {
    const record = {
      id: 'ID',
      _id: 'NOTANID',
      name: 'frodo',
    };
    expect(getId(record)).toEqual('ID');
  });

  it('should return the _id, if no id is available', () => {
    const record = {
      _id: 'ID',
      name: 'frodo',
    };
    expect(getId(record)).toEqual('ID');
  });

  it('should only return the object identifier part of the id', () => {
    const record = {
      _id: 'gb|contacts|ID',
      name: 'frodo',
    };
    expect(getId(record)).toEqual('ID');
  });

  it('should throw if no id is available', () => {
    const record = {
      name: 'Smeagol',
      nickname: 'Gollum',
    };
    expect(() => getId(record)).toThrow();
  });

  it('should throw if there is an id containing | characters but the format does not make sense', () => {
    const record = {
      id: 'gb|ID',
      name: 'Smeagol',
      nickname: 'Gollum',
    };
    expect(() => getId(record)).toThrow();
  });
});

describe('determineFeedId', () => {
  it('should create a new pheed id without a trailing slash', () => {
    const result = determineFeedId('http://reactjsnewsletter.com/issues.rss');
    expect(result).toEqual(
      'pheed|feed|http://reactjsnewsletter.com/issues.rss'
    );
  });

  it('should remove the trailing slash if one is present', () => {
    const result = determineFeedId('http://reactjsnewsletter.com/issues.rss/');
    expect(result).toEqual(
      'pheed|feed|http://reactjsnewsletter.com/issues.rss'
    );
  });
});

describe('filterObject', () => {
  const original = {
    negative: -1,
    positive: 2,
  };

  it('should remove values when the filter function is false', () => {
    const positiveNumbers = filterObject(original, value => value > 0);
    expect(positiveNumbers).not.toHaveProperty('negative');
  });

  it('should keep values when the filter function is true', () => {
    const positiveNumbers = filterObject(original, value => value > 0);
    expect(positiveNumbers).toHaveProperty('positive', 2);
  });

  it('should use the identity filter by default', () => {
    const original = {
      zero: 0,
      negative: -1,
      positive: 2,
    };
    const truthyValues = filterObject(original);
    expect(truthyValues).toHaveProperty('positive');
    expect(truthyValues).not.toHaveProperty('zero');
  });
});

describe('filterObjectByKeys', () => {
  const original = {
    name: 'Aragorn',
    email: 'aragorn@gondor.org',
    class: 'Ranger',
  };
  deepFreeze(original);

  it('should include properties that have been specified', () => {
    const filtered = filterObjectByKeys(original, ['name', 'email']);
    expect(filtered).toHaveProperty('name', 'Aragorn');
  });

  it('should exlude properties that have not been specified', () => {
    const filtered = filterObjectByKeys(original, ['name', 'email']);
    expect(filtered).not.toHaveProperty('class');
  });
});

describe('mergeArrays', () => {
  const compareFunction = (a, b) => a - b;

  it('should merge new items into an array and produce a sorted array', () => {
    const initial = [1, 10];
    deepFreeze(initial);
    const toBeAdded = [3, 15];
    deepFreeze(toBeAdded);

    const result = mergeArrays(compareFunction)(initial, toBeAdded);
    expect(result).toEqual([1, 3, 10, 15]);
  });

  it('should assume the old array is already in order', () => {
    const initial = [5, 1, 2, 3, 4];
    deepFreeze(initial);
    const toBeAdded = [1.5, 3.5, 5.5];
    deepFreeze(toBeAdded);

    const result = mergeArrays(compareFunction)(initial, toBeAdded);
    expect(result).toEqual([1.5, 3.5, 5, 1, 2, 3, 4, 5.5]);
  });

  it('should place new items at the beginning of the feed', () => {
    const initial = [5, 10];
    deepFreeze(initial);
    const toBeAdded = [1];
    deepFreeze(toBeAdded);

    const result = mergeArrays(compareFunction)(initial, toBeAdded);
    expect(result).toEqual([1, 5, 10]);
  });
});

describe('applyPush', () => {
  it('push a new item to the beginning of an array', () => {
    const init = ['item 1', 'item 2'];
    deepFreeze(init);
    const result = applyPush('item 0')(init);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual('item 0');
  });
});
