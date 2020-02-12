import { Reducer } from 'redux';
import update from 'immutability-helper';
import { getPosts, savePost, unsavePost } from '../../db';
import { JsonFeedPostData, LoadState, SavedPost } from '../../types';
import { State } from '../shape';
import { applyPush } from '../../helpers';
import { createSavedPost } from '../../db/factory';

export const constants = {
  REQUEST_POSTS: 'posts:requestPosts',
  REQUEST_POSTS_OK: 'posts:requestPosts:ok',
  REQUEST_POSTS_ERR: 'posts:requestPosts:err',
  SAVE_POST: 'posts:savePost',
  SAVE_POST_OK: 'posts:savePost:ok',
  SAVE_POST_ERR: 'posts:savePost:err',
  UNSAVE_POST: 'posts:unsave',
  UNSAVE_POST_OK: 'posts:unsave:ok',
  UNSAVE_POST_ERR: 'posts:unsave:err',
};
const c = constants;

export const actions = {
  requestPosts: () => ({
    type: c.REQUEST_POSTS,
    pouch: getPosts(),
    response: actions.requestPostsOk,
    error: actions.requestPostsError,
  }),

  requestPostsOk: (posts: SavedPost[]) => ({
    type: c.REQUEST_POSTS_OK,
    posts,
  }),

  requestPostsError: (error?: Error) => ({
    type: c.REQUEST_POSTS_ERR,
    error,
    notification: {
      text: 'Error requesting saved posts',
      level: 'error',
      isDismissable: false,
    },
  }),

  save: (parent: string, post: JsonFeedPostData) => {
    const doc = createSavedPost(parent, post);
    if (!doc) {
      return actions.saveError(new Error('id field missing from post'));
    }
    return {
      type: c.SAVE_POST,
      pouch: savePost(doc),
      post: doc,
      response: actions.saveOk,
      error: actions.saveError,
    };
  },

  saveOk: () => ({
    type: c.SAVE_POST_OK,
  }),

  saveError: (error?: Error) => ({
    type: c.SAVE_POST_ERR,
    error,
    notification: {
      text: 'Error saving post',
      level: 'error',
      isDismissable: false,
    },
  }),

  unsave: (id: string) => {
    return {
      type: c.UNSAVE_POST,
      pouch: unsavePost(id),
      id,
      response: actions.unsaveOk,
      error: actions.unsaveErr,
    };
  },

  unsaveOk: () => ({
    type: c.UNSAVE_POST_OK,
  }),

  unsaveErr: (error?: Error) => ({
    type: c.UNSAVE_POST_ERR,
    error,
    notification: {
      text: 'Error unsaving post',
      level: 'error',
      isDismissable: false,
    },
  }),
};

export const reducer: Reducer<State['posts']> = (
  initialState: State['posts'],
  action: any
) => {
  switch (action.type) {
    case c.REQUEST_POSTS: {
      return update(initialState, {
        loadState: { $set: LoadState.Loading },
      });
    }

    case c.REQUEST_POSTS_OK: {
      return update(initialState, {
        loadState: { $set: LoadState.Loaded },
        data: { $set: action.posts },
      });
    }

    case c.SAVE_POST: {
      return update(initialState, {
        data: { $apply: applyPush(action.post) },
      });
    }

    case c.UNSAVE_POST: {
      return update(initialState, {
        data: {
          $apply: (data: State['posts']['data']) =>
            data.filter(post => post.jsonFeed.id !== action.id),
        },
      });
    }

    case '@@koala-redux/CHANGE': {
      return initialState;
      // const process = applyPostChange(action.updates, action.deletions);
      // return update(initialState, {
      //   feeds: {
      //     $apply: process,
      //   },
      // });
    }
  }

  return initialState;
};
