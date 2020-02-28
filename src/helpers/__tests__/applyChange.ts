import { LoadState } from '../../types';
import { applyFeedChange } from '../applyChange';

describe('applyFeedChange', () => {
  const initial: any = [
    {
      loadState: LoadState.Ready,
      feed: { _id: 'afeed', type: 'feed', title: 'Old title' },
    },
    { loadState: LoadState.Ready, feed: { _id: 'adeletedfeed', type: 'feed' } },
  ];

  it('should reconcile a change event', () => {
    const changes = [
      { type: 'post', _id: 'apost' },
      { type: 'feed', _id: 'afeed', title: 'Updated Title' },
      { type: 'feed', _id: 'anewfeed' },
    ];
    const deletions = [{ type: 'feed', _id: 'adeletedfeed' }];

    const final = applyFeedChange(changes, deletions)(initial);
    expect(final).toHaveLength(2);
    expect(final[0]).toHaveProperty('feed._id', 'afeed');
    expect(final[0]).toHaveProperty('feed.title', 'Updated Title');
    expect(final[1]).toHaveProperty('feed._id', 'anewfeed');
    expect(final[1]).toHaveProperty('loadState', LoadState.Ready);
  });
});
