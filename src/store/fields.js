import update from 'immutability-helper'

export const constants = {
  UPDATE: 'FIELDS/UPDATE'
}
const c = constants

export const actions = {
  update: (name, value) =>
    ({type: c.UPDATE, name, value})
}

export const reducer = (inputState = {}, action) => {
  const defaultState = {
    addFeed: ''
  }
  const initialState = update(defaultState, {$merge: inputState})

  switch (action.type) {
    case c.UPDATE: {
      return update(initialState, {
        [action.name]: {$set: action.value}
      })
    }
  }
  return initialState
}
