import { Reducer } from 'redux';
import { State } from '../shape';

export const reducer: Reducer<State['system']> = (
  initialState: State['system'],
  action: any
) => {
  switch (action.type) {
    case '@@koala-redux/DB_READY': {
      return {
        ...initialState,
        isDbAvailable: true,
        username: action.username,
        isFirstLoad: action.isFirstLoad,
      };
    }
  }

  return initialState;
};
