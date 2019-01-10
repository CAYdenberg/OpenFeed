import {filterObjectByKeys} from '../helpers'

const FEED_KEYS = [
  'version',
  'title',
  'home_page_url',
  'feed_url',
  'description',
  'author'
]

export default (data, id) => {
  return {
    modified: new Date().getTime(),
    type: 'feed',
    _id: id,
    ...filterObjectByKeys(data, FEED_KEYS)
  }
}
