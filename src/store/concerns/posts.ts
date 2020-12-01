import { Reducer } from 'redux';
import update from 'immutability-helper';
import { getPosts, savePost, unsavePost } from '../../db';
import {
  ExternalPost,
  JsonFeedPostData,
  LoadState,
  MercuryPostData,
  SavedPost,
} from '../../types';
import { State } from '../shape';
import { applyPush } from '../../helpers';
import { createSavedPost } from '../../db/factory';

export const constants = {
  REQUEST_POSTS: 'posts:requestPosts',
  REQUEST_POSTS_OK: 'posts:requestPosts:ok',
  REQUEST_POSTS_ERR: 'posts:requestPosts:err',
  REQUEST_MERCURY_DATA: 'posts:requestMercuryData',
  REQUEST_MERCURY_DATA_OK: 'posts:requestMercuryData:ok',
  REQUEST_MERCURY_DATA_ERR: 'posts:requestMercuryData:err',
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

  requestMercuryData: (post: ExternalPost | SavedPost) => {
    if (post.mercury) return;
    if (!post.jsonFeed.url) return;

    return {
      type: c.REQUEST_MERCURY_DATA,
      popsicle: {
        url: `${process.env.KOALA_URI}/api/parse?url=${encodeURIComponent(
          post.jsonFeed.url
        )}`,
      },
      response: (res: MercuryPostData) =>
        actions.requestMercuryDataOk(post, res),
      error: (status: number) => actions.requestMercuryDataError(status),
    };
  },

  requestMercuryDataOk: (
    post: ExternalPost | SavedPost,
    res: MercuryPostData
  ) => ({
    type: c.REQUEST_MERCURY_DATA_OK,
    post,
    data: res,
  }),

  requestMercuryDataError: (status: number) => ({
    type: c.REQUEST_MERCURY_DATA_ERR,
    status,
  }),

  _save: (parent: string, post: JsonFeedPostData) => {
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
