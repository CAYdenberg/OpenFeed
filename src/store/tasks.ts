import { State } from './shape';
import * as selectors from './selectors';
import { timelineActions, postsActions } from './actions';

export default [
  [
    (currentState: State, prevState: State) =>
      selectors.isDbAvailable(currentState) &&
      !selectors.isDbAvailable(prevState),
    timelineActions.requestFeeds(),
  ],
  [selectors.findStaleFeed, timelineActions.debouncedCheckFeeds()],
  [selectors.needPosts, postsActions.requestPosts()],
];
