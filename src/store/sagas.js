
// THIS IMPORT MUST OCCUR BEFORE EVERYTHING ELSE:
import regeneratorRuntime from 'regenerator-runtime/runtime'

import {delay} from 'redux-saga'
import {take, call, all, put, select, takeEvery} from 'redux-saga/effects'

import {
  determineFeedId
} from '../helpers'
import {
  constants as newFeedConstants,
  actions as newFeedActions
} from './newFeed'
import {
  constants as feedsConstants,
  actions as feedsActions
} from './feeds'
import {
  actions as postsActions
} from './posts'

function * checkForNewPosts() {
  // get an array of all feeds
  const feeds = yield select(state => state.feeds.feeds)

  // spread out checks to avoid hammering the server and overwhelming
  // UI
  for (const i in feeds) {
    const feed = feeds[i]
    yield put(postsActions.checkForNewPosts(feed))
    yield call(delay, 200)
  }
}

function * dbReadySaga() {
  // load the feeds, and the posts (default view)
  yield all([
    put(feedsActions.loadFeeds()),
    put(postsActions.load())
  ])

  // wait until the feeds have been loaded and then ...
  yield take(feedsConstants.LOAD_FEEDS_OK)

  // check for new posts
  yield call(checkForNewPosts)

  // continue checking every 10 min
  while (true) {
    yield call(delay, 10 * 60 * 1000)
    yield call(checkForNewPosts)
  }
}

function * addFeedToDBSaga() {
  const {loadState, feed, posts, value} = yield select(state => state.newFeed)
  const newFeedId = determineFeedId(value)

  // if no feed has been staged, dont bother trying to add it to the DB
  if (loadState < 2) return

  yield all([
    put(feedsActions.upsertFeed(feed, newFeedId)),
    put(postsActions.populate(posts, newFeedId)),
    put(newFeedActions.reset())
  ])
}

export default function * rootSaga() {
  yield takeEvery(newFeedConstants.ADD_FEED_TO_DB, addFeedToDBSaga)
  yield takeEvery('@@koala-redux/DB_READY', dbReadySaga)
}
