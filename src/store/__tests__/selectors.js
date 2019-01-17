import _clone from 'lodash.clone'

import {
  viewType,
  activeFeed,
  timelinePosts,
  openPost,
  postFromId
} from '../selectors'

describe('viewType', () => {
  it('should be true if the current view is set to all', () => {
    const state = {
      posts: {
        view: {type: 'all'}
      }
    }
    expect(viewType(state)).toEqual('all')
  })

  it('should be false if the current view is not set', () => {
    const state = {
      posts: {
        view: null
      }
    }
    expect(activeFeed(state)).toBeFalsy()
  })
})

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

describe('openPost', () => {
  const state = {
    posts: {
      posts: [
        {_id: 'old post 1', title: 'Old post 1', parent: 'oldfeed'},
        {_id: 'old post 2', title: 'Old post 2', parent: 'oldfeed'}
      ],
      view: {type: 'newFeed'},
      openPost: 'old post 1'
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

  it('should return all data for the currently open post', () => {
    const result = openPost(state)
    expect(result).toHaveProperty('title', 'Old post 1')
  })

  it('should return null if there is no post open', () => {
    const _state = _clone(state)
    _state.posts.openPost = null
    const result = openPost(state)
    expect(result).toBeFalsy()
  })

  it('should return null if the open post is not currently loaded', () => {
    const _state = _clone(state)
    _state.posts.openPost = 'foo'
    const result = openPost(state)
    expect(result).toBeFalsy()
  })
})

describe('postFromId', () => {
  const state = {
    posts: {
      posts: [
        {_id: 'old post 1', title: 'Old post 1', parent: 'oldfeed'},
        {_id: 'old post 2', title: 'Old post 2', parent: 'oldfeed'}
      ],
      view: {type: 'newFeed'},
      openPost: 'old post 1'
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

  it('should return a post by its id', () => {
    const result = postFromId('old post 1')(state)
    return expect(result).toHaveProperty('title', 'Old post 1')
  })

  it('should be falsy if no post can be found', () => {
    const result = postFromId('foobar')(state)
    return expect(result).toBeFalsy()
  })
})
