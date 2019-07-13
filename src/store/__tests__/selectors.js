import _clone from 'lodash.clone'

import {
  activeFeedId,
  timelinePosts,
  openPost,
  postFromId
} from '../selectors'

describe('viewType', () => {
  it('should be a sentinel if the current view is set to all', () => {
    const state = {
      ui: {
        view: {type: 'posts'}
      }
    }
    expect(activeFeedId(state)).toEqual('ALL')
  })

  it('should be false if the current view is a page', () => {
    const state = {
      ui: {
        view: {type: 'page'}
      }
    }
    expect(activeFeedId(state)).toBeFalsy()
  })

  it('should be a feed id if the current view is filtered', () => {
    const state = {
      ui: {
        view: {type: 'posts', filter: {feed: 'http://example.com/feed.xml'}}
      }
    }
    expect(activeFeedId(state)).toEqual('http://example.com/feed.xml')
  })
})

describe('timelinePosts', () => {
  const state = {
    posts: {
      posts: [
        {_id: 'old post 1', title: 'Old post 1', parent: 'oldfeed'},
        {_id: 'old post 2', title: 'Old post 2', parent: 'oldfeed'},
        {_id: 'old post 3', title: 'Old post 3', parent: 'reallyoldfeed'}

      ],
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
    },
    ui: {
      view: {type: 'newFeed'}
    }
  }

  it('should show the posts in newFeed when the view is set to newFeed', () => {
    const result = timelinePosts(state)
    expect(result).toHaveLength(1)
    expect(result[0]).toHaveProperty('title', 'New post 1')
    expect(result[0].feed).toHaveProperty('title', 'New Feed')
  })

  it('should show all the posts in the posts store when the view is set to posts', () => {
    const _state = _clone(state)
    _state.ui.view = {type: 'posts'}
    const result = timelinePosts(_state)
    expect(result).toHaveLength(3)
    expect(result[0]).toHaveProperty('title', 'Old post 1')
    expect(result[0].feed).toHaveProperty('title', 'Old Feed')
  })

  it('should filter the posts', () => {
    const _state = _clone(state)
    _state.ui.view = {type: 'posts', filter: {feed: 'oldfeed'}}
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
