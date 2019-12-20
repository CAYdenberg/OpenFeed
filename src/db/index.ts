import * as PouchDB from 'pouchdb';
import { Store } from 'redux';
import { timelineActions } from '../store/actions';
import * as selectors from '../store/selectors';
import { SavedFeed } from '../types';
import { createFeed } from './factory';

export const getFeeds = () => (db: PouchDB.Database, store: Store) => {
  let query: Promise<SavedFeed[]>;

  if (selectors.isFirstLoad(store.getState())) {
    const feed = createFeed('internal://about/about.json', {
      title: 'About OpenFeed',
    });
    query = db.put(feed).then(({ rev }) => {
      return [{ ...feed, _rev: rev }];
    });
  } else {
    query = db
      .find({
        selector: {
          type: { $eq: 'feed' },
        },
      })
      .then(res => res.docs as SavedFeed[]);
  }

  return query;
};
