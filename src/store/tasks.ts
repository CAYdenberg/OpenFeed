import { State } from './shape';
import * as selectors from './selectors';
import { timelineActions, postsActions } from './actions';

type Task = (
  currentState: State,
  prevState: State
) => { type: string; [k: string]: any } | false;

export default [
  (currentState: State, prevState: State) => {
    if (
      selectors.isDbAvailable(currentState) &&
      !selectors.isDbAvailable(prevState)
    ) {
      return timelineActions.requestFeeds();
    }
    return false;
  },
  (state: State) => {
    if (selectors.findStaleFeed(state)) {
      return timelineActions.debouncedCheckFeeds();
    }
    return false;
  },
  (state: State) => {
    if (selectors.needPosts(state)) {
      return postsActions.requestPosts();
    }
    return false;
  },
  (currentState: State, prevState: State) => {
    const prevPost = selectors.selectedPost(prevState);
    const post = selectors.selectedPost(currentState);
    if (!post) return false;
    if (prevPost && prevPost.jsonFeed.id === post.jsonFeed.id) return false;

    return postsActions.requestMercuryData(post);
  },
] as Task[];
