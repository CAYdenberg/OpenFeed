import update from 'immutability-helper';

// ironically, we mutate the main library
import '../immutability';

import deepFreeze from 'deep-freeze';

describe('$map', () => {
  it('should perform an immutable map operation', () => {
    const initial = [1, 2, 3, 4, 5];
    deepFreeze(initial);
    const final = update(initial, { $map: item => item * item });
    expect(final).toEqual([1, 4, 9, 16, 25]);
  });

  it('should work even when the target array is nested', () => {
    const initial = {
      data: [1, 2, 3, 4, 5],
      metaData: 'foo',
    };
    deepFreeze(initial);
    const final = update(initial, { data: { $map: item => item * item } });
    expect(final.data).toEqual([1, 4, 9, 16, 25]);
  });
});

describe('$filter', () => {
  it('should perform an immutable filter operation', () => {
    const initial = [1, 2, 3, 4, 5];
    // filter for even numbers
    const final = update(initial, { $filter: item => item % 2 === 0 });
    expect(final).toEqual([2, 4]);
  });

  it('should work even when the target array is nested', () => {
    const initial = {
      data: [1, 2, 3, 4, 5],
      metaData: 'foo',
    };
    deepFreeze(initial);
    const final = update(initial, {
      data: { $filter: item => item % 2 === 0 },
    });
    expect(final.data).toEqual([2, 4]);
  });
});
// TODO: should be able to pass a command instead of a function
// const obj = {$map: {$set: 10}}

describe('$where', () => {
  it('should update items in an array that satisty some criteria', () => {
    const initial = [1, 2, 3, 4, 5];
    deepFreeze(initial);
    const final = update(initial, {
      $where: [item => item % 2 === 1, { $set: 'odd' }],
    });
    expect(final).toEqual(['odd', 2, 'odd', 4, 'odd']);
  });

  // it('should update items in an object that satisfy some criteria')

  it('should work even when the target array or object is nested', () => {
    const initial = {
      data: [1, 2, 3, 4, 5],
      metaData: 'foo',
    };
    deepFreeze(initial);
    const final = update(initial, {
      data: {
        $where: [item => item % 2 === 1, { $set: 'odd' }],
      },
    });
    expect(final.data).toEqual(['odd', 2, 'odd', 4, 'odd']);
  });
});

describe('$mergeSort', () => {
  it('should merge new items into an array and produce a sorted array', () => {
    const initial = [1, 10];
    deepFreeze(initial);
    const toBeAdded = [3, 15];
    deepFreeze(toBeAdded);

    const final = update(initial, { $mergeSort: [toBeAdded, (a, b) => a - b] });
    expect(final).toEqual([1, 3, 10, 15]);
  });

  it('should assume the old array is already in order', () => {
    const initial = [5, 1, 2, 3, 4];
    deepFreeze(initial);
    const toBeAdded = [1.5, 3.5, 5.5];
    deepFreeze(toBeAdded);

    const final = update(initial, { $mergeSort: [toBeAdded, (a, b) => a - b] });
    expect(final).toEqual([1.5, 3.5, 5, 1, 2, 3, 4, 5.5]);
  });

  it('should place new items at the beginning of the feed', () => {
    const initial = [5, 10];
    deepFreeze(initial);
    const toBeAdded = [1];
    deepFreeze(toBeAdded);

    const final = update(initial, { $mergeSort: [toBeAdded, (a, b) => a - b] });
    expect(final).toEqual([1, 5, 10]);
  });
});
