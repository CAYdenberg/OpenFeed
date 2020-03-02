import React, { useCallback, useEffect } from 'react';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import { postsActions, viewActions } from '../../store/actions';
import { visiblePosts, selectedPost } from '../../store/selectors';
import { scrollIntoView } from '../../dom';

const Timeline: React.FC = () => {
  const posts = useSelector(visiblePosts);
  const openPost = useSelector(selectedPost);
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

  const handleClickPost = useCallback(
    (id: string) => dispatch(viewActions.selectPost(id)),
    []
  );

  useEffect(() => {
    scrollIntoView(openPost || null);
  }, [openPost]);

  if (!posts.length) {
    return <h3 className="is-size-3 has-text-centered">No posts</h3>;
  }

  return (
    <React.Fragment>
      {posts.map(post => (
        <Post
          post={post.post}
          feed={post.feed}
          isOpen={post.id === openPost}
          isSaved={post.isSaved}
          handleClickPost={handleClickPost}
          handleClickSave={handleClickSave}
          key={post.id}
        />
      ))}
    </React.Fragment>
  );
};

export default Timeline;
