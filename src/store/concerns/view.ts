import { Reducer } from 'redux';
import { State } from '../shape';
import { constants as previewConstants } from './preview';
import update from 'immutability-helper';

export const constants = {
  PANEL: 'view:panel',
  FEED: 'view:feed',
  ALL: 'view:all',
  SETTINGS: 'view:pickSettings',
};
const c = constants;
export const actions = {
  viewPanel: (panel: string) => {
    return {
      type: c.PANEL,
      panel,
    };
  },

  viewFeed: (id: string) => {
    return {
      type: c.FEED,
      id,
    };
  },

  viewAll: () => ({ type: c.ALL }),

  viewSettings: (slug: string) => {
    return {
      type: c.SETTINGS,
      slug,
    };
  },
};

export const reducer: Reducer<State['view']> = (
  initialState: State['view'],
  action: any
) => {
  switch (action.type) {
    case c.PANEL: {
      return update(initialState, {
        panel: { $set: action.panel.toLowerCase() },
        panelOpenMobile: { $set: true },
      });
    }

    case c.FEED: {
      return update(initialState, {
        routeType: { $set: 'feed' },
        selectedFeed: { $set: action.id },
        panelOpenMobile: { $set: false },
      });
    }

    case c.ALL: {
      return update(initialState, {
        routeType: { $set: 'timeline' },
        panelOpenMobile: { $set: false },
      });
    }

    case c.SETTINGS: {
      return update(initialState, {
        routeType: { $set: 'settings' },
        panelOpenMobile: { $set: false },
      });
    }

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
