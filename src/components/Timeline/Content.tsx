import DOMPurify from 'dompurify';
import React from 'react';

interface Props {
  mercury_html?: string | null;
  content_html?: string;
  content_text?: string;
  summary?: string;
}

const Content: React.FC<Props> = ({
  mercury_html,
  content_html,
  content_text,
  summary,
}) =>
  mercury_html ? (
    <div
      className="content"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(mercury_html),
      }}
    />
  ) : content_html ? (
    <div
      className="content"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content_html),
      }}
    />
  ) : content_text ? (
    <div>{content_text}</div>
  ) : (
    <p className="card__summary">{summary}</p>
  );

export default Content;
