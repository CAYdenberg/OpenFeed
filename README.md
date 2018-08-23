Pheed is an installable feed aggregation server that aims to give control of the content you see back to you.

# The Problem

The web used to consist of a "flat" plane of websites and webpages connected by hyperlinks. The primary way of getting information was by actively querying it and finding pages relevant to particular search. Starting in the 2000s, the rise of social networks meant that most users have information come to them, in the form of a feed.

While feeds are useful in the sense that they distill the vast river of the web into a manageable stream, they have the basic problem that the algorithms used to do the filtering and sorting do not always have the users' interest at heart. Moreover, they are opaque: we do not know or understand the reason why we might see one particular post and not another. The consequences of this we are only beginning to understand: during the Brexit referendum and during the 2016 US presidential election, it became apparent that voters of different political persuasions saw completely different news, presumably designed to increase their comfort and happiness by not challenging any preexisting assumptions they may have had.

# What Pheed Does

Pheed is a offline-first content aggregator and sorter. It gives users the ability to add Pheeders (which are REST APIs) to their locally-running app. Pheeders translate various kinds of syndicated content (blog/RSS feeds, Twitter feeds, iTunes, etc.) into a standardized format - the JSONFeed. Once added, the posts from those feeds are merged into a single stream (called the timeline) which can be sorted by one a few simple algorithms and tweaked by user settings.

Pheed can also provide users with feedback on their reading habits (by topic, source, author) and allow them to adjust whether they want to see more or less of a particular type of content.

Pheed is offline-first. Authentication is optional if the user wants to only work on one machine. User data can be synced between different machines via a Couch database.

## Installing Pheed

The server side of Pheed is based on NodeJS and CouchDB. **details**

# Pheeder Interface

The standard format for posts that Pheed deals with conforms to the [JSON Feed spec from Brent Simmons and Manton Reece](https://jsonfeed.org/version/1). Pheeders are thus RESTful APIs which a take a resource URL as input and return the JSONFeed version of the syndicated content as output. Pheeders can be hosted anywhere on the web (they must enable CORS). The Pheed domain hosts some of the most common pheeders.

Note: use https://feed2json.org/ https://github.com/appsattic/feed2json.org or fork so it can be used as middleware.

**Example**

# Philter Interface

The role of philters is to adjust the rankings of posts within the timeline based on user settings. The way this is done is by providing an "adjusted date" which corresponds to the publication date of the item plus a bonus or penalty based on the content of the item and user settings. The Philter can also drop the item from the timeline altogether. Thus Philters can be expressed as pure functions that take into account user settings and the item and return a date adjustment.

Because Philters take into account user info and settings (or reading habits) they cannot be added as easily as Pheeds. They are designed to be configured on set-up of the server at installation time and users can choose between available Philters in their particular Pheed instance.

# Glossary

To keep conversations meaningful and direct, a few terms:

**Feed**: Any HTTP resource which can be expressed as a stream of **posts**. Examples: the list of posts in a blog, the timeline of tweets you consume or produce.

**Timeline**: The aggregated and sorted list of posts produced by Pheeder for the consumption of a particular user.

**Post**: An item within a feed (or timeline).

**Post standard content**: The standardized format/content of a post defined by the JSON Feed spec.

**Pheeder**: An algorithm for consuming a feed. See above.

**Philter**: An algorithm for scoring/ranking posts. See above.

**Post priority**: A score associated with a post for a particular user. Ranged from 0-100.

# Notes and stuff for later

https://developers.facebook.com/docs/graph-api/reference/v2.9/user/feed
https://dev.twitter.com/rest/reference/get/statuses/user_timeline
https://dev.twitter.com/rest/reference/get/friends/ids
