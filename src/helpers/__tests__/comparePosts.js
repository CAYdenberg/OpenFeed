import * as comparePosts from '../comparePosts';

const newPost = {
  title: 'What’s New In CSS?',
  url: 'https://www.smashingmagazine.com/2018/10/tpac-css-working-group-new/',
  id: 'new',
  date_published: '2018-11-02T16:44:06-06:00',
};

const oldPost = {
  title: 'What’s New In CSS?',
  url: 'https://www.smashingmagazine.com/2018/10/tpac-css-working-group-new/',
  id: 'old',
  date_published: '2017-11-02T16:44:06-06:00',
};

describe('byDate', () => {
  it('should return negative when the first argument is the newer post', () => {
    expect(comparePosts.isNewerThan(newPost, oldPost)).toBeLessThan(0);
  });

  it('should not return positive when the first argument is the older post', () => {
    expect(comparePosts.isNewerThan(oldPost, newPost)).not.toBeLessThan(0);
  });
});
