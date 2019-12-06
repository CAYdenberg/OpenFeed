import update from 'immutability-helper';
import { Reducer } from 'redux';
import {
  ExternalPost,
  JsonFeedData,
  LoadState,
  Message,
  SavedFeed,
} from '../types';

export interface State {
  system: {
    isOffline: boolean;
    isDbAvailable: boolean;
    isFirstLoad: boolean;
    isSyncing: boolean;
    username: string | null;
  };

  preview: {
    url: string;
    loadState: LoadState;
    posts: ExternalPost[];
    meta: JsonFeedData | null;
  };

  timeline: {
    loadState: LoadState;
    feeds: Array<{
      feed: SavedFeed;
      checkedAt: number | null;
      loadState: LoadState;
    }>;
    posts: ExternalPost[];
  };

  posts: {
    loadState: LoadState;
    data: ExternalPost[];
  };

  view: {
    selectedFeed: string | null;
    selectedPost: string | null;
    routeType: 'all' | 'feed' | 'settings' | 'preview';
    panel: 'Feeds' | 'Settings';
    menuIsOpen: boolean;
  };

  messages: Message[];
}

export const getInitialState = (): State => ({
  system: {
    isOffline: false,
    isDbAvailable: false,
    isFirstLoad: false,
    isSyncing: false,
    username: null,
  },

  preview: {
    url: '',
    loadState: LoadState.Ready,
    posts: [],
    meta: null,
  },

  timeline: {
    loadState: LoadState.Loading,
    feeds: [],
    posts: [],
  },

  posts: {
    loadState: LoadState.Ready,
    data: [],
  },

  view: {
    routeType: 'all',
    selectedFeed: null,
    selectedPost: null,
    panel: 'Feeds',
    menuIsOpen: false,
  },

  messages: [],
});

export type AugmentedReducer<T> = (
  intialState: T,
  action: any,
  state: State
) => T;

/**
 * Better combineReducers where the full store state is passed as an optional
 * 3rd argument
 */
export function combineReducers(reducers: {
  [key: string]: AugmentedReducer<any>;
}): Reducer {
  return (initialState = {}, action) => {
    return Object.keys(reducers).reduce((state, key) => {
      const reducer = reducers[key];
      state = update(state, {
        [key]: { $set: reducer(state[key], action, state) },
      });
      return state;
    }, initialState);
  };
}
