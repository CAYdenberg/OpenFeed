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
