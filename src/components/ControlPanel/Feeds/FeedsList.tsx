import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { timelineActions, viewActions } from '../../../store/actions';
import {
  timelineFeeds,
  selectedFeed,
  isAllSelected,
} from '../../../store/selectors';
import { SavedFeed } from '../../../types';

export const FeedsList = () => {
  const feeds = useSelector(timelineFeeds);
  const active = useSelector(selectedFeed);
  const viewingAll = useSelector(isAllSelected);
  const dispatch = useDispatch();

  const selectFeed = useCallback(
    (id: string) => dispatch(viewActions.viewFeed(id)),
    []
  );

  const selectAll = useCallback(() => dispatch(viewActions.viewAll()), []);

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

      {feeds.map(feed => {
        const isActive = active === feed.feed._id ? 'is-active' : '';
        return (
          <a
            className={`panel-block is-flex ${isActive}`}
            key={feed.feed._id}
            onClick={() => selectFeed(feed.feed._id)}
          >
            <span className="is-expanded">{feed.feed.displayName}</span>
            <button
              type="button"
              className="delete is-small"
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
