import React, { useCallback } from 'react';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import { postsActions } from '../../store/actions';
import { visiblePosts } from '../../store/selectors';

const Timeline: React.FC = () => {
  const posts = useSelector(visiblePosts);
  const dispatch = useDispatch();

  const handleClickSave = useCallback(
    (id: string) => {
      const post = posts.find(post => post.id === id);
      if (!post) return;
      post.isSaved
        ? dispatch(postsActions.unsave(post.id))
        : dispatch(postsActions.save(post.feed, post.post));
    },
    [posts]
  );

  if (!posts.length) {
    return <h3 className="is-size-3 has-text-centered">No posts</h3>;
  }

  return (
    <React.Fragment>
      {posts.map(post => (
        <Post
          post={post.post}
          feed={post.feed}
          onOpenPost={Boolean}
          isOpen={false}
          isSaved={post.isSaved}
          handleClickSave={handleClickSave}
          key={post.id}
        />
      ))}
    </React.Fragment>
  );
};

export default Timeline;
