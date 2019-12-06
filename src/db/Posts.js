import { DateTime } from 'luxon';
import { filterObjectByKeys } from '../helpers';

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
  'tags',
];

export const determineModified = item => {
  return item.date_modified || item.date_published || DateTime.local().toISO();
};

export default (data, feedId) => {
  return data.map(item => ({
    modified: determineModified(item),
    type: 'post',
    parent: feedId,
    id: `pheed|post|${item.id}`,
    _id: `pheed|post|${item.id}`,
    ...filterObjectByKeys(item, ALLOWED_KEYS),
  }));
};
