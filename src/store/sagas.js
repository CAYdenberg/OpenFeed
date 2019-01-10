
// THIS IMPORT MUST OCCUR BEFORE EVERYTHING ELSE:
import regeneratorRuntime from 'regenerator-runtime/runtime'

import {call, all, put, select, takeEvery} from 'redux-saga/effects'

import {
  constants as newFeedConstants,
  actions as newFeedActions
} from './newFeed'

import {
  actions as feedsActions
} from './feeds'

import {
  actions as postsActions
} from './posts'

function * dbReadySaga() {
  yield all([
    put(feedsActions.loadFeeds()),
    put(postsActions.load())
  ])
}

function * addFeedToDBSaga() {
  const {loadState, feed, posts, value} = yield select(state => state.newFeed)
  const newFeedId = `pheed|feed|${value}`

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
