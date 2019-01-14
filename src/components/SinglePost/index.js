import React from 'react'

const SinglePost = ({post}) => {
  return (
    <article className="content">
      <h1>{post.title}</h1>
      <div>
        {post.content_html}
      </div>
    </article>
  )
}

export default SinglePost
