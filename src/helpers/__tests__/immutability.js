import update from 'immutability-helper'

// ironically, we mutate the main library
import '../immutability'

import deepFreeze from 'deep-freeze'

describe('$map', () => {
  it('should perform an immutable map operation', () => {
    const initial = [1, 2, 3, 4, 5]
    deepFreeze(initial)
    const final = update(initial, {$map: item => item * item})
    expect(final).toEqual([1, 4, 9, 16, 25])
  })

  it('should work even when the target array is nested', () => {
    const initial = {
      data: [1, 2, 3, 4, 5],
      metaData: 'foo'
    }
    deepFreeze(initial)
    const final = update(initial, {data: {$map: item => item * item}})
    expect(final.data).toEqual([1, 4, 9, 16, 25])
  })
})

describe('$filter', () => {
  it('should perform an immutable filter operation', () => {
    const initial = [1, 2, 3, 4, 5]
    // filter for even numbers
    const final = update(initial, {$filter: item => item % 2 === 0})
    expect(final).toEqual([2, 4])
  })

  it('should work even when the target array is nested', () => {
    const initial = {
      data: [1, 2, 3, 4, 5],
      metaData: 'foo'
    }
    deepFreeze(initial)
    const final = update(initial, {data: {$filter: item => item % 2 === 0}})
    expect(final.data).toEqual([2, 4])
  })
})
// TODO: should be able to pass a command instead of a function
// const obj = {$map: {$set: 10}}

describe('$where', () => {
  it('should update items in an array that satisty some criteria', () => {
    const initial = [1, 2, 3, 4, 5]
    deepFreeze(initial)
    const final = update(initial, {$where: [
      item => item % 2 === 1,
      {$set: 'odd'}
    ]})
    expect(final).toEqual(['odd', 2, 'odd', 4, 'odd'])
  })

  // it('should update items in an object that satisfy some criteria')

  it('should work even when the target array or object is nested', () => {
    const initial = {
      data: [1, 2, 3, 4, 5],
      metaData: 'foo'
    }
    deepFreeze(initial)
    const final = update(initial, {data:
      {$where: [
        item => item % 2 === 1,
        {$set: 'odd'}
      ]}
    })
    expect(final.data).toEqual(['odd', 2, 'odd', 4, 'odd'])
  })
})
