import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { timelineActions } from '../../../store/actions';
import { timelineFeeds } from '../../../store/selectors';
import { SavedFeed } from '../../../types';

export const FeedsList = () => {
  const feeds = useSelector(timelineFeeds);
  const dispatch = useDispatch();

  const handleDelete = useCallback(
    (feed: SavedFeed) => dispatch(timelineActions.deleteFeed(feed)),
    [timelineActions.deleteFeed]
  );

  return (
    <React.Fragment>
      <a
        className={`panel-block is-flex ${true ? 'is-active' : ''}`}
        onClick={Boolean}
      >
        All
      </a>

      {feeds.map(feed => {
        const isActive = false ? 'is-active' : '';
        return (
          <a
            className={`panel-block is-flex ${isActive}`}
            key={feed.feed._id}
            onClick={Boolean}
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
