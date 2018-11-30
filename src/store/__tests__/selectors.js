import _clone from 'lodash.clone'

import {
  activeFeed,
  timelinePosts
} from '../selectors'

describe('activeFeed', () => {
  it('should return the id of the active feed', () => {
    const state = {
      posts: {
        view: {type: 'feed', id: 'pheed|feed|https://feeds.feedburner.com/CssTricks'}
      }
    }
    expect(activeFeed(state)).toEqual('pheed|feed|https://feeds.feedburner.com/CssTricks')
  })

  it('should be null if the current view is not a feed', () => {
    const state = {
      posts: {
        view: {type: 'all', order: 'latest'}
      }
    }
    expect(activeFeed(state)).toBeNull()
  })
})

describe('timelinePosts', () => {
  const state = {
    posts: {
      posts: [
        {_id: 'old post 1', title: 'Old post 1', parent: 'oldfeed'},
        {_id: 'old post 2', title: 'Old post 2', parent: 'oldfeed'}
      ],
      view: {type: 'newFeed'}
    },
    newFeed: {
      posts: [
        {_id: 'new post 1', title: 'New post 1'}
      ],
      feed: {title: 'New Feed'}
    },
    feeds: {
      feeds: [
        {_id: 'oldfeed', title: 'Old Feed'}
      ]
    }
  }

  it('should show the posts in newFeed when the view is set to newFeed', () => {
    const result = timelinePosts(state)
    expect(result).toHaveLength(1)
    expect(result[0]).toHaveProperty('title', 'New post 1')
    expect(result[0].feed).toHaveProperty('title', 'New Feed')
  })

  it('should show the posts in the posts store when the view is set to anything else', () => {
    const _state = _clone(state)
    _state.posts.view = {type: 'feed', id: 'oldfeed'}
    const result = timelinePosts(_state)
    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty('title', 'Old post 1')
    expect(result[0].feed).toHaveProperty('title', 'Old Feed')
  })
})
