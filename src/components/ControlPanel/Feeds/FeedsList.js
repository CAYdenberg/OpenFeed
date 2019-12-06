import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from '../../../store/feeds';
import { actions as postsActions } from '../../../store/posts';
import { activeFeedId } from '../../../store/selectors';

const mapStateToProps = state => {
  return {
    feeds: state.feeds.feeds,
    activeFeedId: activeFeedId(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    remove: (id, e) => {
      e.stopPropagation();
      dispatch(actions.removeFeed(id));
    },

    checkNew: (feed, e) => {
      e.stopPropagation();
      dispatch(postsActions.checkForNewPosts(feed));
    },
  };
};

export const FeedsList = props => {
  return (
    <React.Fragment>
      <a
        className={`panel-block is-flex ${
          props.activeFeedId === 'ALL' ? 'is-active' : ''
        }`}
        onClick={() => props.setView({ type: 'posts' })}
      >
        All
      </a>

      {props.feeds.map(feed => {
        const isActive = props.activeFeedId === feed._id ? 'is-active' : '';
        return (
          <a
            className={`panel-block is-flex ${isActive}`}
            key={feed._id}
            onClick={() =>
              props.setView({ type: 'posts', filter: { feed: feed._id } })
            }
          >
            <span className="is-expanded">{feed.title}</span>
            <button
              type="button"
              className="delete is-small"
              onClick={e => props.remove(feed._id, e)}
            >
              Remove
            </button>
          </a>
        );
      })}
    </React.Fragment>
  );
};

FeedsList.propTypes = {
  feeds: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  remove: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedsList);
