import { Reducer } from 'redux';
import { State } from '../shape';
import { constants as previewConstants } from './preview';
import update from 'immutability-helper';

export const constants = {
  PANEL: 'view:panel',
  FEED: 'view:feed',
  ALL: 'view:all',
  OPEN_POST: 'view:openPost',
  CLOSE_POST: 'view:closePost',
  SETTINGS: 'view:pickSettings',
  TOGGLE_MENU: 'view:toggleMenu',
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

  openPost: (id: string) => ({ type: c.OPEN_POST, id }),

  closePost: () => ({ type: c.CLOSE_POST }),

  viewSettings: (slug: string) => {
    return {
      type: c.SETTINGS,
      slug,
    };
  },

  toggleMenu: () => {
    return {
      type: c.TOGGLE_MENU,
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
        selectedFeed: { $set: null },
        panelOpenMobile: { $set: false },
      });
    }

    case c.OPEN_POST: {
      return update(initialState, {
        selectedPost: { $set: action.id },
      });
    }

    case c.CLOSE_POST: {
      return update(initialState, {
        selectedPost: { $set: null },
      });
    }

    case c.SETTINGS: {
      return update(initialState, {
        routeType: { $set: 'settings' },
        panelOpenMobile: { $set: false },
      });
    }

    case c.TOGGLE_MENU: {
      return update(initialState, {
        menuOpenMobile: { $set: !initialState.menuOpenMobile },
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
