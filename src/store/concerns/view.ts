import { Reducer } from 'redux';
import { State } from '../shape';
import { constants as previewConstants } from './preview';
import update from 'immutability-helper';

export const constants = {
  PANEL: 'view:panel',
  FEED: 'view:feed',
  ALL: 'view:all',
  POSTS: 'view:posts',
  SELECT_POST: 'view:openPost',
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

  viewPosts: () => ({ type: c.POSTS }),

  selectPost: (id: string) => ({
    type: c.SELECT_POST,
    id,
  }),

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
        selectedPost: { $set: null },
        panelOpenMobile: { $set: false },
      });
    }

    case c.ALL: {
      return update(initialState, {
        routeType: { $set: 'timeline' },
        selectedFeed: { $set: null },
        selectedPost: { $set: null },
        panelOpenMobile: { $set: false },
      });
    }

    case c.POSTS: {
      return update(initialState, {
        routeType: { $set: 'posts' },
        selectedFeed: { $set: null },
        selectedPost: { $set: null },
        panelOpenMobile: { $set: false },
      });
    }

    case c.SELECT_POST: {
      return update(initialState, {
        selectedPost: { $set: action.id },
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
