import React, { useCallback } from 'react';
import { DateTime } from 'luxon';
import DOMPurify from 'dompurify';
import Icon, { openOriginal } from '../Icons';
import { JsonFeedPostData } from '../../types';

interface Props {
  post: JsonFeedPostData;
  isOpen: boolean;
  feed?: string;
  handleOpenPost: (id: string) => void;
}

const Post: React.FC<Props> = ({ feed, post, isOpen, handleOpenPost }) => {
  const {
    id,
    title,
    summary,
    content_html,
    content_text,
    date_published,
    author,
    url,
  } = post;
  const date = date_published ? DateTime.fromISO(date_published) : null;

  const onOpenPost = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      handleOpenPost(id);
    },
    [id]
  );

  return (
    <div className="card card--post" id={id}>
      <a href="#" className="card-header" onClick={onOpenPost}>
        <h3 className="card-header-title">{title}</h3>
      </a>

      <div className="card-content">
        <p className="card__summary">{summary}</p>

        <div className="is-size-7 has-text-grey metadata">
          {date && (
            <time dateTime={date_published} className="metadata__item">
              {date.toLocaleString()}
            </time>
          )}
          <span className="metadata__item">{author && author.name}</span>
          <span className="metadata__item">{feed}</span>
          {url && (
            <span className="metadata__item">
              <a href={url} target="_blank">
                <span className="icon">
                  <Icon icon={openOriginal} />
                </span>
              </a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
