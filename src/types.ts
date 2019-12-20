export enum LoadState {
  Error = -1,
  Ready = 0,
  Loading = 1,
  Loaded = 2,
}

export enum OFDocumentType {
  Feed = 'feed',
  ExternalPost = 'external-post',
}

export interface OFDocument<T> {
  _id: string;
  _rev?: string;
  type: T;
  parent?: string;
}

export interface Message {
  text: string;
  level: 'info' | 'warning' | 'error';
  timeout: number;
}

export interface JsonFeedAuthorData {
  name?: string;
  url?: string;
  avatar?: string;
}

export interface JsonFeedData {
  version: string;
  title: string;
  home_page_url: string;
  feed_url: string;
  description?: string;
  icon?: string;
  favicon?: string;
  author: JsonFeedAuthorData;
}

export interface JsonFeedPostData {
  id: string;
  url?: string;
  external_url?: string;
  title?: string;
  content_html?: string;
  content_text?: string;
  summary?: string;
  image?: string;
  banner_image?: string;
  date_published?: string;
  date_modified?: string;
  author: JsonFeedAuthorData;
  tags: string[];
}

export interface JsonFeed extends JsonFeedData {
  items: JsonFeedPostData[];
}

export interface ExternalPost {
  jsonFeed: JsonFeedPostData;
  parent: string;
}

export type SavedPost = ExternalPost & OFDocument<OFDocumentType.ExternalPost>;

export interface SavedFeed extends OFDocument<OFDocumentType.Feed> {
  jsonFeed: Partial<JsonFeedData>;
  displayName: string;
  url: string;
}
