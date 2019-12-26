import { Reducer } from 'redux';
import { State } from '../shape';
import { constants as previewConstants } from './preview';
import update from 'immutability-helper';

export const constants = {};
const c = constants;
export const actions = {};

export const reducer: Reducer<State['view']> = (
  initialState: State['view'],
  action: any
) => {
  switch (action.type) {
    case previewConstants.REQUEST_PREVIEW_OK: {
      return update(initialState, {
        routeType: { $set: 'preview' },
      });
    }

    case previewConstants.ADD_FEED_OK: {
      return update(initialState, {
        routeType: { $set: 'timeline' },
      });
    }
  }

  return initialState;
};
