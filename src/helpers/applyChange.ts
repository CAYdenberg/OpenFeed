import { OFDocument, LoadState, SavedFeed, OFDocumentType } from '../types';
import { State } from '../store/shape';

type StoreFeeds = State['timeline']['feeds'];

const createStoreFeed = (feed: SavedFeed) => ({
  loadState: LoadState.Ready,
  checkedAt: null,
  feed,
});

export const applyFeedChange = (
  changes: Array<OFDocument<any>>,
  deletions: Array<OFDocument<any>>
) => {
  const deletionIds = deletions.map(doc => doc._id);

  const releventChanges = changes.filter(
    doc => doc.type === OFDocumentType.Feed
  ) as SavedFeed[];

  return (initial: StoreFeeds): StoreFeeds => {
    return releventChanges.reduce(
      (initial, change) => {
        const i = initial.findIndex(member => member.feed._id === change._id);
        if (i === -1) {
          return [...initial, createStoreFeed(change)];
        } else {
          return [
            ...initial.slice(0, i),
            createStoreFeed(change),
            ...initial.slice(i + 1),
          ];
        }
      },
      initial.filter(storeFeed => !deletionIds.includes(storeFeed.feed._id))
    );
  };
};
