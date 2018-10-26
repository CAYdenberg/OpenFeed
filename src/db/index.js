
export const getFeeds = () => db => {
  return db.find({
    selector: {
      type: {$eq: 'feed'}
    }
  }).then(res => res.docs)
}

/**
 * Wishlist: when encountering conflicts, update the feed data only
 * when the date_modified data exists and is later than any existing one.
 */
export const upsertPost = post => db => {

}

export const upsertFeed = (feed, url) => db => {
  const doc = {
    modified: new Date().getTime(),
    type: 'feed',
    _id: `pheed|feed|${url}`,
    feed_url: feed.feed_url,
    home_page_url: feed.home_page_url,
    title: feed.title,
    version: feed.version
  }
  return db.put(doc).then(() => doc)
}
