import { State } from './shape';
import { LoadState } from '../types';

export const isDbAvailable = (state: State) => state.system.isDbAvailable;

export const isFirstLoad = (state: State) => state.system.isFirstLoad;

export const findStaleFeed = (state: State) =>
  state.timeline.feeds.find(feed => feed.loadState === LoadState.Ready);

export const timelineFeeds = (state: State) => state.timeline.feeds;

export const timelinePosts = (state: State) =>
  state.timeline.posts.map(post => {
    const feed = state.timeline.feeds.find(
      feed => feed.feed._id === post.parent
    );
    return {
      id: post.jsonFeed.id,
      post: post.jsonFeed,
      feed: feed ? feed.feed.displayName : '',
    };
  });
