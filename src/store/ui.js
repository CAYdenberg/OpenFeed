import update from 'immutability-helper'
import {wrapReducer} from './reduxHelpers'

export const constants = {
  SET_CONTROL_PANEL: 'UI/SET_CONTROL_PANEL'
}
const c = constants

export const actions = {
  setControlPanel: (panel) =>
    ({type: c.SET_CONTROL_PANEL, panel})
}

export const reducer = wrapReducer({
  panel: 'Feeds'
}, (initialState, action) => {
  switch (action.type) {
    case c.SET_CONTROL_PANEL: {
      return update(initialState, {panel: {$set: action.panel}})
    }
  }
})
