import React from 'react'
import DOMPurify from 'dompurify'

const SinglePost = ({post}) => {
  return (
    <article className="content">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(post.content_html)
      }} />
    </article>
  )
}

export default SinglePost
