import { State } from './shape';
import config from '../config';
import {
  LoadState,
  JsonFeedPostData,
  ExternalPost,
  SavedPost,
  MercuryPostData,
} from '../types';

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
  state.timeline.feeds.find(
    feed =>
      feed.loadState === LoadState.Ready ||
      (feed.checkedAt &&
        Date.now() - feed.checkedAt > config.FEED_CHECK_INTERVAL)
  );

export const timelineFeeds = (state: State) => state.timeline.feeds;

export const selectedPanel = (state: State) => state.view.panel.toLowerCase();

export const isAllSelected = (state: State) =>
  state.view.routeType === 'timeline';

export const isPostsSelected = (state: State) =>
  state.view.routeType === 'posts';

export const needPosts = (state: State) =>
  state.system.isDbAvailable && state.posts.loadState === LoadState.Ready;

export const selectedFeed = (state: State) =>
  state.view.routeType === 'feed' && state.view.selectedFeed;

export const selectedPost = (state: State): ExternalPost | SavedPost | null => {
  const id = state.view.selectedPost;
  if (!id) return null;
  const timeline = state.timeline.posts.find(post => post.jsonFeed.id === id);
  const saved = state.posts.data.find(post => post._id === id);
  if (timeline && saved) {
    return {
      ...timeline,
      ...saved,
    };
  } else if (timeline) {
    return timeline;
  } else if (saved) {
    return saved;
  } else {
    return null;
  }
};

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

type VisiblePosts = Array<{
  id: string;
  post: JsonFeedPostData;
  feed: string;
  isSaved?: boolean;
  mercury?: MercuryPostData;
}>;

export const visiblePosts = (state: State): VisiblePosts => {
  if (state.view.routeType === 'posts') {
    return state.posts.data.map(post => ({
      id: post.jsonFeed.id,
      post: post.jsonFeed,
      feed: post.parent,
      isSaved: true,
      mercury: post.mercury,
    }));
  }

  const savedPostIds = state.posts.data.map(post => post.jsonFeed.id);

  if (state.view.routeType === 'preview') {
    if (!state.preview.feed) return [];
    return state.preview.feed.items.map(post => ({
      id: post.id,
      post,
      feed: state.preview.feed!.title || '',
      isSaved: savedPostIds.includes(post.id),
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
        isSaved: savedPostIds.includes(post.jsonFeed.id),
        mercury: post.mercury,
      };
    });
};

export const getMostImportantMessage = (state: State) => {
  const index = ['error', 'warning', 'info'].reduce((index, level) => {
    if (index !== -1) return index;
    return state.notifications.findIndex(
      notification => !notification.isDismissed && notification.level === level
    );
  }, -1);
  return { index, message: state.notifications[index] || null };
};
