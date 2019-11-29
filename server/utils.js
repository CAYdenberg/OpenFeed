const ContentType = require('content-type');
const _get = require('lodash.get');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const FEED_TYPES = [
  'application/rss+xml',
  'application/atom+xml',
  'application/rdf+xml',
  'application/rss',
  'application/atom',
  'application/rdf',
  'text/rss+xml',
  'text/atom+xml',
  'text/rdf+xml',
  'text/rss',
  'text/atom',
  'text/rdf',
];

exports.getContentType = res => {
  const ctHeader = res.headers['content-type'];
  if (!ctHeader) return null;
  return _get(ContentType.parse(ctHeader), 'type', null);
};

exports.findFeed = html => {
  const { document } = new JSDOM(html).window;
  const links = document.querySelectorAll('link');
  let i;
  for (i = 0; i < links.length; i++) {
    const link = links[i];
    if (FEED_TYPES.indexOf(link.getAttribute('type')) !== -1) {
      return link.getAttribute('href');
    }
  }
  return null;
};
