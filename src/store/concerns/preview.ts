import { Reducer, Dispatch, Store } from 'redux';
import { State } from '../shape';
import update from 'immutability-helper';
import * as urls from 'valid-url';
import { putFeed } from '../../db';
import { JsonFeed, LoadState, SavedFeed } from '../../types';

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
    };
  },

  requestPreviewOk: (res: JsonFeed) => {
    return {
      type: c.REQUEST_PREVIEW_OK,
      feed: res,
    };
  },

  addFeed: (url: string, jsonFeed: JsonFeed) => {
    return {
      type: c.ADD_FEED,
      posts: jsonFeed.items,
      pouch: putFeed(url, jsonFeed),
      response: actions.addFeedOk,
    };
  },

  addFeedOk: (feed: SavedFeed) => ({
    type: c.ADD_FEED_OK,
    feed,
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
  }

  return initialState;
};
