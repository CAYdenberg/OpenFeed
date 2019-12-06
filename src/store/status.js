import { wrapReducer } from './reduxHelpers';
import update from 'immutability-helper';

export const reducer = wrapReducer(
  {
    username: '',
  },
  (initialState, action) => {
    switch (action.type) {
      case '@@koala-redux/DB_READY': {
        return update(initialState, { username: { $set: action.username } });
      }
    }
  }
);
