import update from 'immutability-helper';
import { Reducer } from 'redux';
import { ExternalPost, JsonFeedData, LoadState, Message } from '../types';

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
    meta: JsonFeedData;
  };

  timeline: {
    feeds: ExternalPost[];
    loadState: LoadState;
    responses: Array<{ loadState: LoadState; posts: ExternalPost[] }>;
  };

  posts: {
    loadState: LoadState;
    data: ExternalPost[];
  };

  view: {
    route: {
      selectedFeed: string;
      selectedPost: string;
      type: 'all' | 'feed' | 'settings' | 'preview';
    };
    panel: string;
    menuIsOpen: boolean;
  };

  messages: Message[];
}

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
