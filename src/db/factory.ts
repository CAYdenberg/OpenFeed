import { JsonFeedData, SavedFeed, OFDocumentType } from '../types';
import normalizeUrl from 'normalize-url';
import { filterObjectByKeys } from '../helpers';

export const generateId = (documentType: OFDocumentType, identifier: string) =>
  `openfeed|${documentType}|${identifier}`;

const AUTHOR_KEYS = ['name', 'url', 'avatar'];

const FEED_KEYS = [
  'version',
  'title',
  'home_page_url',
  'feed_url',
  'description',
  'icon',
  'favicon',
  'author',
];

const POST_KEYS = [
  'id',
  'url',
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

export const createFeed = (
  url: string,
  properties: Partial<JsonFeedData>
): SavedFeed => {
  const normalUrl = normalizeUrl(url);
  return {
    displayName: properties.title || normalUrl,
    url: normalUrl,
    jsonFeed: filterObjectByKeys(properties, FEED_KEYS),
    type: OFDocumentType.Feed,
    _id: generateId(OFDocumentType.Feed, normalUrl),
  };
};
