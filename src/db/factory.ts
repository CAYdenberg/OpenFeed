import { JsonFeedData, SavedFeed, OFDocumentType } from '../types';
import normalizeUrl from 'normalize-url';

export const generateId = (documentType: OFDocumentType, identifier: string) =>
  `openfeed|${documentType}|${identifier}`;

export const createFeed = (
  url: string,
  properties: Partial<JsonFeedData>
): SavedFeed => {
  const normalUrl = normalizeUrl(url);
  return {
    displayName: properties.title || normalUrl,
    url: normalUrl,
    jsonFeed: properties,
    type: OFDocumentType.Feed,
    _id: generateId(OFDocumentType.Feed, normalUrl),
  };
};
