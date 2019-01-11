import update from 'immutability-helper'
import {wrapReducer} from './reduxHelpers'

export const constants = {
  SET_CONTROL_PANEL: 'UI/SET_CONTROL_PANEL',
  CLOSE_PANEL_MOBILE: 'UI/CLOSE_PANEL_MOBILE',
  TOGGLE_HAMBURGER: 'UI/TOGGLE_HAMBURGER',
}
const c = constants

export const actions = {
  setControlPanel: (panel) =>
    ({type: c.SET_CONTROL_PANEL, panel}),

  reqCloseMobile: () =>
    ({type: c.CLOSE_PANEL_MOBILE}),

  toggleHamburger: () =>
    ({type: c.TOGGLE_HAMBURGER})
}

export const reducer = wrapReducer({
  panel: 'Feeds',
  panelHiddenMobile: true,
  hamburgerIsOpen: false,
}, (initialState, action) => {
  switch (action.type) {
    case c.SET_CONTROL_PANEL: {
      return update(initialState, {
        panel: {$set: action.panel},
        panelHiddenMobile: {$set: false}
      })
    }

    case c.CLOSE_PANEL_MOBILE: {
      return update(initialState, {
        panelHiddenMobile: {$set: true}
      })
    }

    case c.TOGGLE_HAMBURGER: {
      return update(initialState, {
        hamburgerIsOpen: {$set: !initialState.hamburgerIsOpen}
      })
    }
  }
})
