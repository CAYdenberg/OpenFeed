import { Reducer, Dispatch, Store } from 'redux';
import { State, getInitialState } from '../shape';
import update from 'immutability-helper';
import * as urls from 'valid-url';
import { putFeed } from '../../db';
import { JsonFeed, LoadState, SavedFeed, JsonFeedPostData } from '../../types';

export const constants = {
  CHANGE_URL: 'preview:changeUrl',
  REQUEST_PREVIEW: 'preview:requestPreview',
  REQUEST_PREVIEW_OK: 'preview:requestPreview:ok',
  REQUEST_PREVIEW_ERROR: 'preview:requestPreview:error',
  ADD_FEED: 'preview:addFeed',
  ADD_FEED_OK: 'preview:addFeed:Ok',
};
const c = constants;

export const actions = {
  _changeUrl: (value: string) => ({
    type: c.CHANGE_URL,
    value,
  }),

  changeUrl: (value: string) => (
    dispatch: Dispatch,
    getState: Store['getState']
  ) => {
    dispatch(actions._changeUrl(value));
    setTimeout(() => {
      if (urls.isUri(value) && value === getState().preview.url) {
        dispatch(actions.requestPreview(value));
      } else {
        dispatch(actions.requestPreviewError());
      }
    }, 200);
  },

  requestPreview: (url: string) => {
    return {
      type: c.REQUEST_PREVIEW,
      url,
      popsicle: {
        url: `${process.env.KOALA_URI}/api/convert?url=${encodeURIComponent(
          url
        )}`,
      },
      response: actions.requestPreviewOk,
      error: actions.requestPreviewError,
    };
  },

  requestPreviewOk: (res: JsonFeed) => {
    return {
      type: c.REQUEST_PREVIEW_OK,
      feed: res,
    };
  },

  requestPreviewError: (status?: number) => {
    return {
      type: c.REQUEST_PREVIEW_ERROR,
      status,
    };
  },

  addFeed: (url: string, jsonFeed: JsonFeed) => {
    const posts = jsonFeed.items;
    return {
      type: c.ADD_FEED,
      posts,
      pouch: putFeed(url, jsonFeed),
      response: (feed: SavedFeed) => actions.addFeedOk(feed, posts),
    };
  },

  addFeedOk: (feed: SavedFeed, posts: JsonFeedPostData[]) => ({
    type: c.ADD_FEED_OK,
    feed,
    posts: posts.map(post => ({ jsonFeed: post, parent: feed._id })),
  }),
};

export const reducer: Reducer<State['preview']> = (
  initialState: State['preview'],
  action: any
) => {
  switch (action.type) {
    case c.CHANGE_URL: {
      return update(initialState, {
        url: { $set: action.value },
      });
    }

    case c.REQUEST_PREVIEW: {
      return update(initialState, {
        loadState: { $set: LoadState.Loading },
      });
    }

    case c.REQUEST_PREVIEW_OK: {
      return update(initialState, {
        loadState: { $set: LoadState.Loaded },
        feed: { $set: action.feed },
      });
    }

    case c.REQUEST_PREVIEW_ERROR: {
      return update(initialState, {
        loadState: { $set: LoadState.Error },
        feed: { $set: null },
      });
    }

    case c.ADD_FEED_OK: {
      return getInitialState().preview;
    }
  }

  return initialState;
};
