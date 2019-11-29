import { actions, reducer } from '../feeds'
import deepFreeze from 'deep-freeze'

const { upsertFeed, upsertFeedOk, removeFeed, sync } = actions

const nullState = reducer(undefined, { type: 'noop' })
const runActions = actions =>
  actions.reduce((state, action) => {
    deepFreeze(state)
    return reducer(state, action)
  }, nullState)

const feed = {
  version: '1.0.0',
  title: 'Casey A. Ydenbergs blog feed',
  home_page_url: 'http://github.com/dylang/node-rss',
  feed_url: null,
  foo: 'bar',
}

describe('action creators', () => {
  describe('upsertFeed', () => {
    it('should autogenerate modified data, _id and type', () => {
      const result = upsertFeed(feed, 'pheed|feed|http://feed.com')
      expect(result.doc).toHaveProperty('_id')
      expect(result.doc).toHaveProperty('modified')
      expect(result.doc).toHaveProperty('type', 'feed')
    })

    it('should filter out unrecognized data', () => {
      const result = upsertFeed(feed, 'pheed|feed|http://feed.com')
      expect(result.doc).not.toHaveProperty('foo')
    })
  })
})

describe('upsertFeed', () => {
  it('should place a new feed in the store', () => {
    const finalState = reducer(
      nullState,
      upsertFeed(feed, 'pheed|feed|http://feed.com')
    )
    expect(finalState.feeds).toHaveLength(1)
    expect(finalState.feeds[0]).toHaveProperty('_id')
    expect(finalState.feeds[0]).not.toHaveProperty('_rev')
  })

  it('should replace an existing feed with the same id', () => {
    const finalState = runActions([
      upsertFeed(feed, 'feed|pheed|http://feed.com'),
      upsertFeedOk({
        ok: true,
        id: 'pheed|feed|http://feed.com',
        rev: 'revision',
      }),
      upsertFeed(feed, 'feed|pheed|http://feed.com'),
    ])
    expect(finalState.feeds).toHaveLength(1)
    expect(finalState.feeds[0]).toHaveProperty('_id')
    expect(finalState.feeds[0]).not.toHaveProperty('_rev')
  })
})

describe('upsertFeedOk', () => {
  it('should add a revision to the existing document', () => {
    const finalState = runActions([
      upsertFeed(feed, 'pheed|feed|http://feed.com'),
      upsertFeedOk({
        ok: true,
        id: 'pheed|feed|http://feed.com',
        rev: 'revision',
      }),
    ])
    expect(finalState.feeds).toHaveLength(1)
    expect(finalState.feeds[0]).toHaveProperty('_id')
    expect(finalState.feeds[0]).toHaveProperty('_rev')
  })
})

describe('removeFeed', () => {
  const finalState = runActions([
    upsertFeed(feed, 'http://feed.com'),
    upsertFeedOk({
      ok: true,
      id: 'pheed|feed|http://feed.com',
      rev: 'revision',
    }),
    removeFeed('pheed|feed|http://feed.com'),
  ])
  expect(finalState.feeds).toHaveLength(0)
})
