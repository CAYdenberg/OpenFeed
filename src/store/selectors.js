import _get from 'lodash.get'

export const activeFeed = state => {
  const view = _get(state, 'posts.view')

  if (!view) return null
  return (view.type === 'feed') ? view.id : null
}

export const timelinePosts = state => {
  const currentViewType = _get(state, 'posts.view.type')

  return (currentViewType === 'newFeed')
    ? state.newFeed.posts.map(post => ({
      feed: state.newFeed.feed,
      ...post
    }))
    : state.posts.posts.map(post => ({
      feed: state.feeds.feeds.find(feed => post.parent === feed._id),
      ...post
    }))
}
