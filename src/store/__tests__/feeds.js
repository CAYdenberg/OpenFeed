import {actions, reducer} from '../feeds'

const {addNewFeed, reqNewFeed} = actions

const nullState = reducer(undefined, {type: 'noop'})

describe('reqNewFeed', () => {
  it('should request a new feed', () => {
    const finalState = reducer(nullState,
      reqNewFeed('http://example.com/atom.xml')
    )
    expect(finalState).toHaveProperty('newFeedRequestState', 1)
  })
})

describe('addNewFeed', () => {
  it('should add a new feed', () => {
    const finalState = reducer(nullState,
      addNewFeed('http://example.com/atom.xml')
    )
    expect(finalState).toHaveProperty('newFeedRequestState', 2)
    expect(finalState.feeds).toHaveLength(1)
  })
})
