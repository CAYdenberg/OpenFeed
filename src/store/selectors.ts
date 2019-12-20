import { State } from './shape';
import { LoadState } from '../types';

export const isDbAvailable = (state: State) => state.system.isDbAvailable;

export const isFirstLoad = (state: State) => state.system.isFirstLoad;

export const findStaleFeed = (state: State) =>
  state.timeline.feeds.find(feed => feed.loadState === LoadState.Ready);
