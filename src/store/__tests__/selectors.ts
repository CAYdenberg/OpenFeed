/* tslint:disable:no-implicit-dependencies */

import clone from 'lodash.clonedeep';
import * as selectors from '../selectors';
import { State, getInitialState } from '../shape';
import { OFDocumentType, LoadState } from '../../types';

const _base: State = {
  ...getInitialState(),

  timeline: {
    loadState: 2,
    feeds: [
      {
        feed: {
          _id: 'feed1',
          displayName: 'Saved Feed',
          jsonFeed: {},
          url: 'http://feed1.com',
          type: OFDocumentType.Feed,
        },
        loadState: 2,
        checkedAt: null,
      },
    ],
    posts: [
      {
        jsonFeed: { id: 'post1', title: 'Post from saved feed' },
        parent: 'feed1',
      },
    ],
  },

  preview: {
    url: 'http://feed2.com',
    loadState: 2,
    feed: {
      version: '1.0',
      title: 'Preview Feed',
      items: [{ id: 'post2', title: 'Preview post' }],
    },
  },
};

describe('visiblePosts', () => {
  it('when viewing the timeline', () => {
    const state = clone(_base);
    state.view.routeType = 'timeline';
    const result = selectors.visiblePosts(state);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('id', 'post1');
    expect(result[0]).toHaveProperty('feed', 'Saved Feed');
  });

  it('when view a specific feed', () => {
    const state = clone(_base);
    state.view.routeType = 'feed';
    state.view.selectedFeed = 'feed1';
    const result = selectors.visiblePosts(state);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('id', 'post1');
    expect(result[0]).toHaveProperty('feed', 'Saved Feed');
  });

  it('when view a specific, empty, feed', () => {
    const state = clone(_base);
    state.view.routeType = 'feed';
    state.view.selectedFeed = 'nofeed';
    const result = selectors.visiblePosts(state);
    expect(result).toHaveLength(0);
  });

  it('when previewing a feed', () => {
    const state = clone(_base);
    state.view.routeType = 'preview';
    const result = selectors.visiblePosts(state);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('id', 'post2');
    expect(result[0]).toHaveProperty('feed', 'Preview Feed');
  });
});

describe('getMostImportantMessage', () => {
  it('should be nullish when there are no undismissed notifications', () => {
    const state: any = {
      notifications: [{ isDismissed: true, level: 'error' }],
    };
    const result = selectors.getMostImportantMessage(state);
    expect(result).toEqual({ index: -1, message: null });
  });

  it('should find the newest un-dismissed error', () => {
    const state: any = {
      notifications: [
        { isDismissed: true, level: 'error' },
        { isDismissed: false, level: 'info' },
        { isDismissed: false, level: 'error' },
      ],
    };
    const result = selectors.getMostImportantMessage(state);
    expect(result).toHaveProperty('index', 2);
  });

  it('should find the newest un-dismissed warning if there are no errors', () => {
    const state: any = {
      notifications: [
        { isDismissed: true, level: 'error' },
        { isDismissed: false, level: 'warning' },
      ],
    };
    const result = selectors.getMostImportantMessage(state);
    expect(result).toHaveProperty('index', 1);
  });
});
