import * as comparePosts from '../comparePosts';

const newPost = {
  jsonFeed: {
    title: 'What’s New In CSS?',
    url: 'https://www.smashingmagazine.com/2018/10/tpac-css-working-group-new/',
    id: 'new',
    date_published: '2018-11-02T16:44:06-06:00',
  },
  parent: 'feedA',
};

const oldPost = {
  jsonFeed: {
    title: 'What’s New In CSS?',
    url: 'https://www.smashingmagazine.com/2018/10/tpac-css-working-group-new/',
    id: 'old',
    date_published: '2017-11-02T16:44:06-06:00',
  },
  parent: 'feedB',
};

describe('byDate', () => {
  it('should return negative when the first argument is the newer post', () => {
    expect(comparePosts.isNewerThan(newPost, oldPost)).toBeLessThan(0);
  });

  it('should not return positive when the first argument is the older post', () => {
    expect(comparePosts.isNewerThan(oldPost, newPost)).not.toBeLessThan(0);
  });

  describe('with missing date_published', () => {
    const missing = {
      jsonFeed: {
        title: 'What’s New In CSS?',
        url:
          'https://www.smashingmagazine.com/2018/10/tpac-css-working-group-new/',
        id: 'old',
      },
      parent: 'feedC',
    };

    it('should return the post containing the date_published as higher ranking', () => {
      expect(comparePosts.isNewerThan(oldPost, missing)).toBeLessThan(0);
    });

    it('should return the post containing the date_published as higher ranking (first argument)', () => {
      expect(comparePosts.isNewerThan(missing, oldPost)).toBeGreaterThan(0);
    });

    it('should return 0 if both are missing a date_published', () => {
      expect(comparePosts.isNewerThan(missing, missing)).toEqual(0);
    });
  });
});
