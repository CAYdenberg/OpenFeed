import update from 'immutability-helper'
import {wrapReducer} from './reduxHelpers'

import {getId} from '../helpers'
import comparePosts from '../helpers/comparePosts'
import Posts from '../db/Posts'
import {actions as error} from './errors'

export const constants = {
  CHECK_FOR_NEW: 'POSTS/CHECK_FOR_NEW',
  ADD_NEW: 'POSTS/ADD_NEW',
  OPEN_POST: 'POSTS/OPEN_POST',
  CLOSE_POST: 'POSTS/CLOSE_POST',
}
const c = constants

export const actions = {
  checkForNewPosts: (feed) => {
    const url = getId(feed)
    return {
      type: c.CHECK_FOR_NEW,
      popsicle: {
        url: `${process.env.KOALA_URI}/api/convert?url=${encodeURIComponent(url)}`
      },
      response: (res) => actions.addNewPosts(res.items, feed._id),
      error: (e) => error.set('Error checking for new posts', e)
    }
  },

  addNewPosts: (posts, feedId) => {
    const postsWithFeed = Posts(posts, feedId)
    return {
      type: c.ADD_NEW,
      response: actions.addNewPostsOk,
      posts: postsWithFeed,
      feed: feedId
    }
  },

  openPost: (_id) =>
    ({type: c.OPEN_POST, _id}),

  closePost: () =>
    ({type: c.CLOSE_POST})
}

export const reducer = wrapReducer({
  posts: [],
  openPost: null
}, (initialState, action) => {
  switch (action.type) {
    case c.ADD_NEW: {
      const initialPostIds = initialState.posts.map(post => post._id)
      const newPosts = action.posts.filter(post =>
        initialPostIds.indexOf(post._id) === -1
      )
      return update(initialState, {
        posts: {$mergeSort: [newPosts, comparePosts]}
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
