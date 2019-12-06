import { combineReducers } from './shape';

import { reducer as system } from './concerns/system';
import { reducer as timeline } from './concerns/timeline';

export default combineReducers({
  system,
  timeline,
});
