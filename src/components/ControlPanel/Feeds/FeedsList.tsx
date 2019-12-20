import React from 'react';
import { useSelector } from 'react-redux';
import { timelineFeeds } from '../../../store/selectors';

export const FeedsList = () => {
  const feeds = useSelector(timelineFeeds);

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
            <button type="button" className="delete is-small" onClick={Boolean}>
              Remove
            </button>
          </a>
        );
      })}
    </React.Fragment>
  );
};

export default FeedsList;
