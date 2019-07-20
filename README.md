Open Feed 🌎
==

Open Feed is a web-based syndicated content reader, aggregator and writer. It works just like Google Reader (RIP) or other feed aggregators, but intentionally designed to satisfy the social-network experience on the independent web (see "Why does this exist?", below).

It works similar to existing RSS readers: just add a web or feed URL in the text box. You only need to create an account to sync between different browsers/devices.

## Contributing ⌨️

### Setting up a development environment

#### Requirements:

- Node >= 8.16.0
- NPM >= 6.9.0
- CouchDB >= 16.04 (will need to be running in the background during development).

You will also need to [add CORS to CouchDB](https://www.npmjs.com/package/add-cors-to-couchdb).

#### Up and running:

```
https://github.com/CAYdenberg/openfeed.git
cd openfeed
npm i
npm start
```

#### Approximate roadmap:

So far this is a solo project so I only a rough outline of what I'd like to do. If you're thinking of writing a PR just post an issue sketching what you'd like to do first.

I'll develop more specific contributing guidelines as it becomes necessary. For now, just be nice to me and others.

1. Save for later. Instead of saving posts and marking as read/unread, only put explicitly requested posts into the user database.
1. Solidify API of [rss-to-json-feed](https://github.com/CAYdenberg/rss-to-json-feed). I would like the interface for this package to be an Express plugin, to return fully-valid JSON Feeds in all cases, to not rely on redirects, and to accept webpage URLs and return either the preferred feed type or a list of choices of feeds. (I would also like it to support iTunes and other Podcast RSS/ATOM feeds - possibly including YouTube, by correctly filling the `media_url` data field.)
1. Feed authoring. A bit of an epic but this involves allowing user to create a profile (and save it in pouchdb), and posts. Once posts are created they can be published/unpublished/discarded. Published posts will be collected and presented through a (public) server endpoint (via CouchDB calls). I'll also need some kind of WYSIWYG (probably Draft.js based).
1. Handling conflicts. This will be a bigger deal once post authoring is a consideration.
