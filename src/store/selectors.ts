import { State } from './shape';
import { LoadState } from '../types';

export const isDbAvailable = (state: State) => state.system.isDbAvailable;

export const isFirstLoad = (state: State) => state.system.isFirstLoad;

export const findStaleFeed = (state: State) =>
  state.timeline.feeds.find(feed => feed.loadState === LoadState.Ready);

export const timelineFeeds = (state: State) => state.timeline.feeds;

export const previewForm = (state: State) => ({
  url: state.preview.url,
  loadState: state.preview.loadState,
  jsonFeed: state.preview.feed,
  isAddable:
    state.preview.loadState === LoadState.Loaded &&
    state.preview.feed &&
    state.preview.feed.items,
});

export const visiblePosts = (state: State) => {
  if (state.view.routeType === 'preview') {
    if (!state.preview.feed) return [];
    return state.preview.feed.items.map(post => ({
      id: post.id,
      post,
      feed: state.preview.feed!.title || '',
    }));
  }

  return state.timeline.posts.map(post => {
    const feed = state.timeline.feeds.find(
      feed => feed.feed._id === post.parent
    );
    return {
      id: post.jsonFeed.id,
      post: post.jsonFeed,
      feed: feed ? feed.feed.displayName : '',
    };
  });
};
