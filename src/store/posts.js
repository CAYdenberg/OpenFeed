import update from 'immutability-helper'
import {wrapReducer} from './reduxHelpers'

import {loadPosts, loadPostsByFeed, upsert, upsertFromStore} from '../db'
import {getId} from '../helpers'
import Posts from '../db/Posts'
import {postFromId} from './selectors'
import {constants as newFeedConstants} from './newFeed'

const constants = {
  SET_VIEW: 'POSTS/SET_VIEW',
  POPULATE: 'POSTS/POPULATE',
  POPULATE_OK: 'POSTS/POPULATE_OK',
  POPULATE_ERR: 'POSTS/POPULATE_ERR',
  LOAD: 'POSTS/LOAD',
  LOAD_OK: 'POSTS/LOAD_OK',
  LOAD_ERR: 'POSTS/LOAD_ERR',
  CHECK_FOR_NEW: 'POSTS/CHECK_FOR_NEW',
  ADD_NEW: 'POSTS/ADD_NEW',
  ADD_NEW_OK: 'POSTS/ADD_NEW_OK',
  MODIFY: 'POSTS/MODIFY',
  MODIFY_OK: 'POSTS/MODIFY_OK',
  OPEN_POST: 'POSTS/OPEN_POST',
  CLOSE_POST: 'POSTS/CLOSE_POST',
}
const c = constants

export const actions = {
  setView: (page) =>
    ({type: c.SET_VIEW, page}),

  populate: (data, feedId) => {
    const docs = Posts(data, feedId)
    return {
      type: c.POPULATE,
      docs,
      view: {type: 'feed', id: feedId},
      pouch: upsert(docs),
      response: actions.populateOk,
      error: actions.populateErr
    }
  },

  populateOk: (res) => {
    return {type: c.POPULATE_OK, res}
  },

  populateErr: (status) => {
    return {type: c.POPULATE_ERR, status}
  },

  load: () => {
    return {
      type: c.LOAD,
      pouch: loadPosts(),
      view: {type: 'all'},
      response: actions.loadOk,
      error: actions.loadErr,
    }
  },

  loadByFeed: (id) => {
    return {
      type: c.LOAD,
      pouch: loadPostsByFeed(id),
      view: {type: 'feed', id},
      response: actions.loadOk,
      error: actions.loadErr
    }
  },

  loadOk: posts => {
    return {type: c.LOAD_OK, posts}
  },

  loadErr: (status, err) => {
    return {type: c.LOAD_ERR, status, err}
  },

  checkForNewPosts: (feed) => {
    const url = getId(feed)
    return {
      type: c.CHECK_FOR_NEW,
      popsicle: {
        url: `${process.env.KOALA_URI}/api/convert?url=${encodeURIComponent(url)}`
      },
      response: (res) => actions.addNewPosts(res, feed._id),
      error: console.error
    }
  },

  addNewPosts: (res, feedId) => {
    const posts = Posts(res.items, feedId)
    return {
      type: c.ADD_NEW,
      pouch: upsert(posts),
      response: actions.addNewPostsOk,
      posts,
      feed: feedId
    }
  },

  addNewPostsOk: posts =>
    ({type: c.ADD_NEW_OK, posts}),

  modify: (id, changes) => {
    const findPost = postFromId(id)
    return {
      type: c.MODIFY,
      id,
      changes,
      pouch: upsertFromStore(findPost),
      response: actions.modifyOk,
      error: console.error
    }
  },

  markRead: (id) => actions.modify(id, {isRead: true}),

  modifyOk: (post) =>
    ({type: c.MODIFY_OK, post}),

  openPost: (_id) =>
    ({type: c.OPEN_POST, _id}),

  closePost: () =>
    ({type: c.CLOSE_POST})
}

export const reducer = wrapReducer({
  view: null,
  loadState: 0,
  posts: [],
  openPost: null
}, (initialState, action) => {
  switch (action.type) {
    case c.SET_VIEW: {
      return update(initialState, {
        view: {$set: {type: 'page', id: action.page}}
      })
    }

    case c.POPULATE: {
      return update(initialState, {
        posts: {$set: action.docs},
        loadState: {$set: 2},
        view: {$set: action.view}
      })
    }

    case c.LOAD: {
      return update(initialState, {
        loadState: {$set: 1},
        view: {$set: action.view}
      })
    }

    case c.LOAD_OK: {
      return update(initialState, {
        loadState: {$set: 2},
        posts: {$set: action.posts}
      })
    }

    case newFeedConstants.NEW_FEED_RES: {
      return update(initialState, {
        view: {$set: {type: 'newFeed'}}
      })
    }

    case c.MODIFY: {
      const i = initialState.posts.findIndex(post => post._id === action.id)
      if (i === -1) return initialState
      return update(initialState, {
        posts: {[i]: {$merge: action.changes}}
      })
    }

    case c.OPEN_POST: {
      return update(initialState, {
        openPost: {$set: action._id}
      })
    }

    case c.CLOSE_POST: {
      return update(initialState, {
        openPost: {$set: null}
      })
    }
  }
})
