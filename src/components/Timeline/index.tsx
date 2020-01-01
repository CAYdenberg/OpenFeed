import React from 'react';
import Post from './Post';
import { useSelector } from 'react-redux';
import { visiblePosts } from '../../store/selectors';

const Timeline: React.FC = () => {
  const posts = useSelector(visiblePosts);

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
          key={post.id}
        />
      ))}
    </React.Fragment>
  );
};

export default Timeline;
