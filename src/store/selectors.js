import _get from 'lodash.get'

export const activeFeedId = state => {
  const view = state.ui.view
  if (view.type !== 'posts') return ''
  return _get(view, 'filter.feed', 'ALL')
}

export const timelinePosts = state => {
  const currentViewType = _get(state, 'ui.view.type')
  const currentFilter = _get(state, 'ui.view.filter.feed')

  return (currentViewType === 'newFeed')
    ? state.newFeed.posts.map(post => ({
      feed: state.newFeed.feed,
      ...post
    }))
    : state.posts.posts.filter(post =>
      currentFilter ? currentFilter === post.parent : true)
      .map(post => ({
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
