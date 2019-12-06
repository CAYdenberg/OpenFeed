/* eslint-disable no-console */

import update from 'immutability-helper';
import { wrapReducer } from './reduxHelpers';

const constants = {
  SET: 'ERRORS/SET',
  DISMISS: 'ERRORS/DISMISS',
};
const c = constants;

export const actions = {
  set: (message, error) => {
    console.error(message, error);
    return { type: c.SET, message };
  },

  dismiss: () => ({ type: c.DISMISS }),
};

export const reducer = wrapReducer(
  {
    message: null,
  },
  (initialState, action) => {
    switch (action.type) {
      case c.SET: {
        return update(initialState, {
          message: { $set: action.message },
        });
      }

      case c.DISMISS: {
        return update(initialState, {
          message: { $set: null },
        });
      }
    }
  }
);
