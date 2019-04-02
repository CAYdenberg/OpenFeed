import {actions, reducer} from '../posts'
import deepFreeze from 'deep-freeze'
import '../../helpers/immutability'

const nullState = reducer(undefined, {type: 'noop'})
deepFreeze(nullState)

const {populate, modify} = actions

const posts = [
  {
    title: 'What’s New In CSS?',
    url: 'https://www.smashingmagazine.com/2018/10/tpac-css-working-group-new/',
    id: 'https://css-tricks.com/?p=278395',
    date_published: '2018-11-02T16:44:06-06:00'
  },
  {
    title: 'Understanding React Render Props and HOC',
    url: 'https://blog.bitsrc.io/understanding-react-render-props-and-hoc-b37a9576e196',
    id: 'https://css-tricks.com/?p=278255',
    date_published: '2018-11-01T13:25:40-06:00'
  }
]

describe('action creators', () => {
  describe('populate', () => {
    it('should pass the documents to populate to upsert', () => {
      const result = populate(posts, 'http://feed.com')
      expect(result.docs).toHaveLength(2)
      expect(result.docs[0]).toHaveProperty('_id')
      expect(result.docs[0]).toHaveProperty('modified')
      expect(result.docs[0]).toHaveProperty('type', 'post')
    })
  })
})

describe('reducer', () => {
  describe('populate', () => {
    it('should set the current contents of the store', () => {
      const finalState = reducer(nullState,
        populate(posts, 'http://feed.com')
      )

      expect(finalState.posts).toHaveLength(2)
      expect(finalState.posts[0]).toHaveProperty('_id')
      expect(finalState.posts[0]).not.toHaveProperty('_rev')
      expect(finalState.view).toEqual({type: 'feed', id: 'http://feed.com'})
      expect(finalState.loadState).toEqual(2)
    })
  })

  describe('modify', () => {
    const initialState = Object.assign({}, nullState, {posts:
      [
        {
          title: 'What’s New In CSS?',
          url: 'https://www.smashingmagazine.com/2018/10/tpac-css-working-group-new/',
          _id: 'id1',
          date_published: '2018-11-02T16:44:06-06:00'
        },
        {
          title: 'Understanding React Render Props and HOC',
          url: 'https://blog.bitsrc.io/understanding-react-render-props-and-hoc-b37a9576e196',
          _id: 'id2',
          date_published: '2018-11-01T13:25:40-06:00'
        }
      ]
    })
    deepFreeze(initialState)

    it('should modify any property of a post', () => {
      const finalState = reducer(initialState,
        modify('id1', {date_published: 'NOW!'})
      )
      expect(finalState.posts).toHaveLength(2)
      expect(finalState.posts[0]).toHaveProperty('date_published', 'NOW!')
      expect(finalState.posts[1]).toEqual(initialState.posts[1])
    })

    it('should add any property if it isnt there', () => {
      const finalState = reducer(initialState,
        modify('id1', {isRead: true})
      )
      expect(finalState.posts).toHaveLength(2)
      expect(finalState.posts[0]).toHaveProperty('isRead', true)
      expect(finalState.posts[1]).toEqual(initialState.posts[1])
    })

    it('should not change anything if the id is not present', () => {
      const finalState = reducer(initialState,
        modify('foo', {isRead: true})
      )
      expect(finalState).toEqual(initialState)
    })
  })

  describe('addNewPosts', () => {
    it('should insert new posts at the start of the posts list')

    it('should not insert any duplicate posts')

    it('should not insert any posts if the view is set to a feed that is different from the one this post is in')
  })
})
