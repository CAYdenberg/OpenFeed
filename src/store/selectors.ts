import { State } from './shape';
import { LoadState } from '../types';

export const isDbAvailable = (state: State) => state.system.isDbAvailable;

export const isFirstLoad = (state: State) => state.system.isFirstLoad;

interface AuthInfo {
  isAuthenticated: boolean;
  provider: string;
  name: string;
}
export const authInfo = (state: State): AuthInfo => {
  const username = state.system.username;
  if (!username) {
    return { isAuthenticated: false, provider: '', name: '' };
  }

  const [provider, name] = username.split('-');
  return { isAuthenticated: true, provider, name };
};

export const findStaleFeed = (state: State) =>
  state.timeline.feeds.find(feed => feed.loadState === LoadState.Ready);

export const timelineFeeds = (state: State) => state.timeline.feeds;

export const selectedPanel = (state: State) => state.view.panel.toLowerCase();

export const isAllSelected = (state: State) =>
  state.view.routeType === 'timeline';

export const selectedFeed = (state: State) =>
  state.view.routeType === 'feed' && state.view.selectedFeed;

export const isSettingsOpen = (state: State) =>
  state.view.routeType === 'settings';

export const panelOpenMobile = (state: State) => state.view.panelOpenMobile;

export const menuOpenMobile = (state: State) => state.view.menuOpenMobile;

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

  return state.timeline.posts
    .filter(post => {
      if (!state.view.selectedFeed) return true;
      return state.view.selectedFeed === post.parent;
    })
    .map(post => {
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
