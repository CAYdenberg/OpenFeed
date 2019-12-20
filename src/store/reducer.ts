import { combineReducers } from './shape';

import { reducer as system } from './concerns/system';
import { reducer as timeline } from './concerns/timeline';
import { reducer as preview } from './concerns/preview';
import { reducer as view } from './concerns/view';

export default combineReducers({
  system,
  timeline,
  preview,
  view,
});
