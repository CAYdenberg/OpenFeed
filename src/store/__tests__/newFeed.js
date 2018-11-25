import {actions, reducer} from '../newFeed'
import deepFreeze from 'deep-freeze'

const {updateValue, newFeedReq, newFeedRes} = actions

const nullState = reducer(undefined, {type: 'noop'})
const runActions = actions => actions.reduce((state, action) => {
  deepFreeze(state)
  return reducer(state, action)
}, nullState)

describe('reducer', () => {
  it('should update the value of the text field', () => {
    const finalState = runActions([
      updateValue('http://feed.com')
    ])

    expect(finalState).toHaveProperty('value', 'http://feed.com')
  })

  it('should request a new feed', () => {
    const finalState = runActions([
      updateValue('http://feed.com'),
      newFeedReq()
    ])

    expect(finalState).toHaveProperty('loadState', 1)
  })

  it('should not request a new feed if the text field is empty', () => {
    const finalState = runActions([
      newFeedReq()
    ])

    expect(finalState).toHaveProperty('loadState', 0)
  })

  // it('should not request a new feed if the text field does not contain a valid url')

  it('should stage a new feed', () => {
    const finalState = runActions([
      updateValue('http://feed.com'),
      newFeedReq(),
      newFeedRes({
        title: 'Example feed',
        items: ['item1', 'item2']
      })
    ])

    expect(finalState).toHaveProperty('loadState', 2)
    expect(finalState.feed).toHaveProperty('title', 'Example feed')
    expect(finalState.posts).toHaveLength(2)
  })

  it('should not stage the feed if the input value not longer matches whats in the textbox', () => {
    const finalState = runActions([
      updateValue('http://feed.com'),
      newFeedReq(),
      updateValue('http://feed.ca'),
      newFeedRes({
        title: 'Example feed',
        items: ['item1', 'item2']
      })
    ])

    expect(finalState).toHaveProperty('loadState', 0)
  })

  it('should remove the staged feed everytime the text box value changes', () => {
    const finalState = runActions([
      updateValue('http://feed.com'),
      newFeedReq(),
      newFeedRes({
        title: 'Example feed',
        items: ['item1', 'item2']
      }),
      updateValue('http://feed.ca')
    ])

    expect(finalState).toHaveProperty('loadState', 0)
    expect(finalState.feed).toBeFalsy()
    expect(finalState.posts).toHaveLength(0)
  })
})
