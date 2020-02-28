import { combineReducers } from './shape';

import { reducer as system } from './concerns/system';
import { reducer as timeline } from './concerns/timeline';
import { reducer as preview } from './concerns/preview';
import { reducer as view } from './concerns/view';
import { reducer as notifications } from './concerns/notifications';
import { reducer as posts } from './concerns/posts';

export default combineReducers({
  system,
  timeline,
  preview,
  view,
  notifications,
  posts,
});
