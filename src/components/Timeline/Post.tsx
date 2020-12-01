import React, { useCallback } from 'react';
import { DateTime } from 'luxon';
import DOMPurify from 'dompurify';
import Icon, { openOriginal, save, unsave } from '../Icons';
import { JsonFeedPostData, MercuryPostData } from '../../types';
import Content from './Content';

interface Props {
  post: JsonFeedPostData;
  mercury?: MercuryPostData;
  isOpen: boolean;
  isSaved?: boolean;
  feed?: string;
  handleClickPost: (id: string) => void;
  handleClickSave: (id: string) => void;
}

const Post: React.FC<Props> = ({
  feed,
  post,
  mercury,
  isSaved,
  isOpen,
  handleClickPost,
  handleClickSave,
}) => {
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

  const onClickPost = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      handleClickPost && handleClickPost(id);
    },
    [handleClickPost, id]
  );

  const onClickSave = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      handleClickSave(post.id);
    },
    [feed, post, handleClickSave]
  );

  return (
    <div className="card card--post" id={id}>
      <a href="#" className="card-header" onClick={onClickPost}>
        <h3 className="card-header-title">{title}</h3>
      </a>

      <div className="card-content">
        {isOpen ? (
          <Content
            mercury_html={mercury && mercury.content}
            content_html={content_html}
            content_text={content_text}
            summary={summary}
          />
        ) : (
          <p className="card__summary">{summary}</p>
        )}

        <div className="is-size-7 has-text-grey metadata">
          {date && (
            <time dateTime={date_published} className="metadata__item">
              {date.toLocaleString()}
            </time>
          )}
          <span className="metadata__item">{author && author.name}</span>
          <span className="metadata__item">{feed}</span>
          <span className="metadata__item">
            <a role="button" onClick={onClickSave}>
              <span className="icon">
                <Icon icon={isSaved ? unsave : save} />
              </span>
            </a>
          </span>
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
