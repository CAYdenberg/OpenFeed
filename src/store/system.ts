import { Reducer, Action } from 'redux';
import { State } from './shape';

export const reducer: Reducer<State['system']> = (
  initialState: State['system'],
  action: Action
) => {
  initialState = initialState || {
    isOffline: false,
    isDbAvailable: false,
    isFirstLoad: false,
    isSyncing: false,
    username: null,
  };

  return initialState;
};
