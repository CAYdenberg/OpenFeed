import update from 'immutability-helper';

export function wrapReducer(defaultState, reducer) {
  return (inputState = {}, action) => {
    const initialState = update(defaultState, { $merge: inputState });
    const finalState = reducer(initialState, action);
    return finalState || initialState;
  };
}

/**
 * Better combineReducers where the full store state is passed as an optional
 * 3rd argument
 */
export function combineReducers(reducers) {
  return (initialState = {}, action) => {
    return Object.keys(reducers).reduce((state, key) => {
      const reducer = reducers[key];
      state = update(state, {
        [key]: { $set: reducer(state[key], action, state) },
      });
      return state;
    }, initialState);
  };
}
