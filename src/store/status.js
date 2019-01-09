import {wrapReducer} from './reduxHelpers'
import update from 'immutability-helper'

export const reducer = wrapReducer({
  username: ''
}, (initialState, action) => {
  switch (action.type) {
    case '@@koala-redux/SET_USER': {
      return update(initialState, {username: {$set: action.username}})
    }
  }
})
