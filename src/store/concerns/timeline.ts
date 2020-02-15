import { Reducer, Dispatch, Store } from 'redux';
import update from 'immutability-helper';
import { getFeeds, deleteFeed } from '../../db';
import {
  JsonFeed,
  JsonFeedPostData,
  LoadState,
  SavedFeed,
  ExternalPost,
} from '../../types';
import { State } from '../shape';
import { findStaleFeed } from '../selectors';
import { constants as previewConstants } from './preview';
import { mergeArrays } from '../../helpers';
import * as comparePosts from '../../helpers/comparePosts';
import { applyFeedChange } from '../../helpers/applyChange';

export const constants = {
  REQUEST_FEEDS: 'timeline:requestFeeds',
  REQUEST_FEEDS_OK: 'timeline:requestFeeds:ok',
  REQUEST_FEEDS_ERROR: 'timeline:requestFeeds:error',
  CHECK_FEED: 'timeline:checkFeed',
  CHECK_FEED_OK: 'timeline:checkFeed:ok',
  CHECK_FEED_ERROR: 'timeline:checkFeed:error',
  DELETE_FEED: 'timeline:deleteFeed',
  DELETE_FEED_OK: 'timeline:deletedFeed:ok',
};
const c = constants;

export const actions = {
  requestFeeds: () => ({
    type: c.REQUEST_FEEDS,
    pouch: getFeeds(),
    response: actions.requestFeedsOk,
    error: actions.requestFeedsError,
  }),

  requestFeedsOk: (feeds: SavedFeed[]) => ({
    type: c.REQUEST_FEEDS_OK,
    feeds,
  }),

  requestFeedsError: (error?: Error) => ({
    type: c.REQUEST_FEEDS_ERROR,
    error,
    notification: {
      text: 'Error loading your feeds',
      level: 'error',
      isDismissable: false,
    },
  }),

  checkFeed: (feed: SavedFeed) => {
    const { url } = feed;
    return {
      type: c.CHECK_FEED,
      id: feed._id,
      popsicle: {
        url: `${process.env.KOALA_URI}/api/convert?url=${encodeURIComponent(
          url
        )}`,
      },
      time: Date.now(),
      response: (res: JsonFeed) => actions.checkFeedOk(res.items, feed._id),
      error: actions.checkFeedError,
    };
  },

  debouncedCheckFeeds: () => (
    dispatch: Dispatch,
    getState: Store['getState']
  ) => {
    const staleFeed = findStaleFeed(getState());
    if (!staleFeed) return;
    setTimeout(() => dispatch(actions.checkFeed(staleFeed.feed)), 200);
  },

  checkFeedOk: (res: JsonFeedPostData[], id: string) => {
    return {
      type: c.CHECK_FEED_OK,
      id,
      posts: res.map(post => ({
        jsonFeed: post,
        parent: id,
      })),
    };
  },

  checkFeedError: (status?: number) => {
    return {
      type: c.CHECK_FEED_ERROR,
      status,
    };
  },

  deleteFeed: (feed: SavedFeed) => {
    return {
      type: c.DELETE_FEED,
      id: feed._id,
      pouch: deleteFeed(feed),
      response: actions.deleteFeedOk,
    };
  },

  deleteFeedOk: ({ id }: { id: string }) => {
    return {
      type: c.DELETE_FEED_OK,
      id,
    };
  },
};

const mergeTimeline = mergeArrays<ExternalPost>(comparePosts.isNewerThan);

export const reducer: Reducer<State['timeline']> = (
  initialState: State['timeline'],
  action: any
) => {
  switch (action.type) {
    case c.REQUEST_FEEDS_OK: {
      const feeds = action.feeds.map((feed: SavedFeed) => ({
        feed,
        checkedAt: null,
        loadState: LoadState.Ready,
      }));
      return update(initialState, {
        loadState: { $set: LoadState.Loaded },
        feeds: { $set: feeds },
      });
    }

    case c.CHECK_FEED: {
      const i = initialState.feeds.findIndex(
        feed => feed.feed._id === action.id
      );
      if (i === -1) return initialState;
      return update(initialState, {
        feeds: {
          [i]: {
            $merge: { loadState: LoadState.Loading, checkedAt: action.time },
          },
        },
      });
    }

    case c.CHECK_FEED_OK: {
      const i = initialState.feeds.findIndex(
        feed => feed.feed._id === action.id
      );
      if (i === -1) return initialState;
      return update(initialState, {
        feeds: {
          [i]: { loadState: { $set: LoadState.Loaded } },
        },
        posts: {
          $apply: (posts: State['timeline']['posts']) =>
            mergeTimeline(posts, action.posts),
        },
      });
    }

    case c.CHECK_FEED_ERROR: {
      const i = initialState.feeds.findIndex(
        feed => feed.feed._id === action.id
      );
      if (i === -1) return initialState;
      return update(initialState, {
        feeds: {
          [i]: { loadState: { $set: LoadState.Error } },
        },
      });
    }

    case c.DELETE_FEED: {
      return update(initialState, {
        feeds: {
          $apply: (feeds: State['timeline']['feeds']) =>
            feeds.filter(feed => feed.feed._id !== action.id),
        },
        posts: {
          $apply: (posts: State['timeline']['posts']) =>
            posts.filter(post => post.parent !== action.id),
        },
      });
    }

    case previewConstants.ADD_FEED_OK: {
      const feed = {
        feed: action.feed,
        checkedAt: null,
        loadState: LoadState.Loaded,
      };
      return update(initialState, {
        feeds: { $push: [feed] },
        posts: {
          $apply: (posts: State['timeline']['posts']) =>
            mergeTimeline(posts, action.posts),
        },
      });
    }

    case '@@koala-redux/CHANGE': {
      const process = applyFeedChange(action.updates, action.deletions);
      return update(initialState, {
        feeds: {
          $apply: process,
        },
      });
    }
  }

  return initialState;
};
