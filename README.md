Pheed is an installable feed aggregation server that aims to give control of the content you see back to you.

# The Problem

The web used to consist of a "flat" plane of websites and webpages connected by hyperlinks. The primary way of getting information was by actively querying it and finding pages relevant to particular search. Starting in the 2000s, the rise of social networks meant that most users have information come to them, in the form of a feed.

While feeds are useful in the sense that they distill the vast river of the web into a manageable stream, they have the basic problem that the algorithms used to do the filtering and sorting do not always have the users' interest at heart. Moreover, they are opaque: we do not know or understand the reason why we might see one particular post and not another. The consequences of this we are only beginning to understand: during the Brexit referendum and during the 2016 US presidential election, it became apparent that voters of different political persuasions saw completely different news, presumably designed to increase their comfort and happiness by not challenging any preexisting assumptions they may have had.

# What Pheed Does

Once installed on a server, Pheed **aggregates** and **sorts** posts that come in from **pheeders** selected by the user. Users can add an RSS feed, Twitter or Facebook timeline, LinkedIn news feed, or any other type of feed that is defined by a **pheeder**. Once added, these feeds are aggregated and sorted, according to a **philter** that is selected by the user and is open-source (and thus transparent). The aggregated and filtered feed can be consumed by the user through a default website or a through a JSON format (which allows mobile apps, browser plugins, etc..).

## How it works

Pheed does little on its own. It provides an authentication system together with the ability of users to add feeds. These feeds must be recognised by an installed "pheeder" which translates a feed (e.g. a Facebook timeline) into a common format. Philters then work with this common format to sort/drop posts in the aggregated feed. The output is HTML or JSON.

The only default pheeder is for adding RSS feeds, and the only default philter sorts by publication date.

## Installing Pheed

Pheed is based on NodeJS and MongoDB. --details to be filled in--

# Pheeder Interface

The standard format for posts that Pheed deals with conforms to the [JSON Feed spec from Brent Simmons and Manton Reece](https://jsonfeed.org/version/1). Pheeders are thus pure functions which take an HTTP post body (string) as input and return an array of JSON feed `items` objects (it doesn't need to handle the outer parts like `title` and `feed_url`, as these are part of the aggregated feed). The Pheed core will handle actually making the actual HTTP request and handling erroneous responses. Pheeders can thus assume the response body will be from a successful (2xx) response.

**Example**

# Philter Interface

The role of philters is to assign a score to an post based on the item's content and the user's options (details on how this works to be filled out later). It is thus a pure function which accepts a JSON feed `item` as the first argument and returns an integer from 0 to 100 (called the **priority**). Items with higher priorities will shown at the top of the user's aggregated feed, above items with lower scores. Items with a priority of 0 will not be shown in the aggregated feed at all.

**Example**

# Pheed as an API

Pheed provides a simple web interface on its own but all resources can also be accessed by API (once authenticated).

# Glossary

To keep conversations meaningful and direct, a few terms:

**Feed**: Any HTTP resource which can be expressed as a stream of **posts**. Examples: the list of posts in a blog, the timeline of tweets you consume or produce.

**Aggregated feed**: The aggregated and sorted list of posts produced by Pheeder for the consumption of a particular user.

**Post**: An item within a feed (or aggregated feed).

**Post standard content**: The standardized format/content of a post defined by the JSON Feed spec.

**Pheeder**: An algorithm for consuming a feed. See above.

**Philter**: An algorithm for scoring/ranking posts. See above.

**Post priority**: A score associated with a post for a particular user. Ranged from 0-100.

# Notes and stuff for later

https://developers.facebook.com/docs/graph-api/reference/v2.9/user/feed
https://dev.twitter.com/rest/reference/get/statuses/user_timeline
https://dev.twitter.com/rest/reference/get/friends/ids