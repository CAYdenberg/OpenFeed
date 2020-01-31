import React, { useCallback } from 'react';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import { visiblePosts } from '../../store/selectors';
import { viewActions } from '../../store/actions';

const Timeline: React.FC = () => {
  const posts = useSelector(visiblePosts);
  const dispatch = useDispatch();

  const handleOpenPost = useCallback((id: string) => {
    dispatch(viewActions.openPost(id));
  }, []);

  if (!posts.length) {
    return <h3 className="is-size-3 has-text-centered">No posts</h3>;
  }

  return (
    <React.Fragment>
      {posts.map(post => (
        <Post
          post={post.post}
          feed={post.feed}
          handleOpenPost={handleOpenPost}
          isOpen={false}
          key={post.id}
        />
      ))}
    </React.Fragment>
  );
};

export default Timeline;
