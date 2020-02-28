import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { timelineActions, viewActions } from '../../../store/actions';
import {
  timelineFeeds,
  selectedFeed,
  isAllSelected,
  isPostsSelected,
} from '../../../store/selectors';
import { SavedFeed, LoadState } from '../../../types';
import Icon, { invalid } from '../../Icons';

export const FeedsList = () => {
  const feeds = useSelector(timelineFeeds);
  const active = useSelector(selectedFeed);
  const viewingAll = useSelector(isAllSelected);
  const viewingSavedPosts = useSelector(isPostsSelected);
  const dispatch = useDispatch();

  const selectFeed = useCallback(
    (id: string) => dispatch(viewActions.viewFeed(id)),
    []
  );

  const selectAll = useCallback(() => dispatch(viewActions.viewAll()), []);
  const selectPosts = useCallback(() => dispatch(viewActions.viewPosts()), []);

  const handleDelete = useCallback(
    (feed: SavedFeed) => dispatch(timelineActions.deleteFeed(feed)),
    [timelineActions.deleteFeed]
  );

  return (
    <React.Fragment>
      <a
        className={`panel-block is-flex ${viewingAll ? 'is-active' : ''}`}
        onClick={selectAll}
      >
        All
      </a>

      <a
        className={`panel-block is-flex ${
          viewingSavedPosts ? 'is-active' : ''
        }`}
        onClick={selectPosts}
      >
        Saved Posts
      </a>

      {feeds.map(feed => {
        const isActive = active === feed.feed._id ? 'is-active' : '';
        return (
          <a
            className={`tick panel-block ${isActive}`}
            key={feed.feed._id}
            onClick={() => selectFeed(feed.feed._id)}
          >
            <span className="tick__left">
              <span className="tick__text">{feed.feed.displayName}</span>
              {feed.loadState === LoadState.Error ? (
                <Icon icon={invalid} style={{ color: '#FF2E12' }} />
              ) : feed.loadState === LoadState.Loading ? (
                <span className="loader" />
              ) : null}
            </span>
            <button
              type="button"
              className="delete is-small tick__right"
              onClick={() => handleDelete(feed.feed)}
            >
              Remove
            </button>
          </a>
        );
      })}
    </React.Fragment>
  );
};

export default FeedsList;
