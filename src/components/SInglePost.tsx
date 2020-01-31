import React from 'react';
import DOMPurify from 'dompurify';
import { ExternalPost, SavedPost } from '../types';

interface Props {
  post: ExternalPost | SavedPost;
}

const SinglePost: React.FC<Props> = ({ post }) => {
  return (
    <article className="content">
      <h1>{post.jsonFeed.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.jsonFeed.content_html),
        }}
      />
    </article>
  );
};

export default SinglePost;
