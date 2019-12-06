import { Reducer } from 'redux';
import { getFeeds } from '../../db';
import { JsonFeed, JsonFeedPostData, LoadState, SavedFeed } from '../../types';
import { State } from '../shape';
import update from 'immutability-helper';

export const constants = {
  REQUEST_FEEDS: 'timeline:requestFeeds',
  REQUEST_FEEDS_OK: 'timeline:requestFeeds:ok',
  CHECK_FEED: 'timeline:checkFeed',
  CHECK_FEED_OK: 'timeline:checkFeed:ok',
};
const c = constants;

export const actions = {
  requestFeeds: () => ({
    type: c.REQUEST_FEEDS,
    pouch: getFeeds(),
    response: actions.requestFeedsOk,
    error: console.error,
  }),

  requestFeedsOk: (feeds: SavedFeed[]) => ({
    type: c.REQUEST_FEEDS_OK,
    feeds,
  }),

  checkFeed: (feed: SavedFeed) => {
    const url = feed.jsonFeed.feed_url;
    return {
      type: c.CHECK_FEED,
      id: feed._id,
      popsicle: {
        url: `${process.env.KOALA_URI}/api/convert?url=${encodeURIComponent(
          url
        )}`,
      },
      response: (res: JsonFeed) => actions.checkFeedOk(res.items, feed._id),
      error: console.error,
    };
  },

  checkFeedOk: (res: JsonFeedPostData[], id: string) => {
    return {
      type: c.CHECK_FEED_OK,
      posts: res.map(post => ({
        jsonFeed: post,
        parent: id,
      })),
    };
  },
};

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
  }

  return initialState;
};
