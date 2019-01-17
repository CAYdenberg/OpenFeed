import _get from 'lodash.get'

export const viewType = state => {
  const view = _get(state, 'posts.view')

  if (!view) return null
  return view.type || null
}

export const activeFeed = state => {
  const view = _get(state, 'posts.view')
  const type = viewType(state)
  return (type === 'feed') ? view.id : null
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

export const openPost = state => {
  const openPostId = _get(state, 'posts.openPost')
  const post = state.posts.posts.find(post => post._id === openPostId)
  return post || null
}

export const postFromId = id => state => {
  const posts = _get(state, 'posts.posts')
  return posts.find(post => post._id === id) || null
}
