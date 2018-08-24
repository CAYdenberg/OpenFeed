import {actions, reducer} from '../fields'

const {update} = actions

const nullState = reducer(undefined, {type: 'noop'})

describe('update', () => {
  it('should update the value of a field', () => {
    const finalState = reducer(nullState,
      update('addFeed', 'value')
    )
    expect(finalState).toHaveProperty('addFeed', 'value')
  })
})
