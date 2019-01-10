import {filterObjectByKeys} from '../helpers'

const ALLOWED_KEYS = [
  'external_url',
  'title',
  'content_html',
  'content_text',
  'summary',
  'image',
  'banner_image',
  'date_published',
  'date_modified',
  'author',
  'tags'
]

export default (data, feedId) => {
  return data.map(item => ({
    modified: new Date().getTime(),
    type: 'post',
    parent: feedId,
    _id: `pheed|post|${item.id}`,
    ...filterObjectByKeys(item, ALLOWED_KEYS),
  }))
}
