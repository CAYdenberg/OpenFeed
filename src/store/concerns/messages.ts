import { Reducer } from 'redux';
import { State } from '../shape';
import update from 'immutability-helper';

const constants = {
  DISMISS: 'messages:Dismiss',
};
const c = constants;

export const actions = {
  dismiss: (index: number) => {
    return {
      type: c.DISMISS,
      index,
    };
  },
};

export const reducer: Reducer<State['messages']> = (
  initialState: State['messages'],
  action: any
) => {
  if (action.type === c.DISMISS) {
    return update(initialState, {
      [action.index]: { $merge: { isDismissed: true } },
    });
  }

  if (!action.notification) return initialState;
  return update(initialState, {
    $push: [{ timeout: 3000, ...action.notification, isDismissed: false }],
  });
};
