# Why does this exist?

Casey A. Ydenberg

## 1. The Problem

Broadly speaking, information can have value either as a result of being current (up-to-date), or as a result of being curated, accurate and complete. One type of information is like a river - information that is constant flowing, and the other like a lake - information that is discarded when it becomes obsolete, but comparatively stays quite stable over time.  Lake information is primarily static, and can be browsed, or otherwise actively sought after. Libraries and encyclopedias provide examples of lake information. By contrast, river information is always changing, and is usually consumed more passively. Television broadcasts and newspapers are example of river information.

The mental model of the world-wide web, as originally conceived by Tim Berners-Lee and later realized during the 1990s, was as a set of pages organized into websites and linked via hypertext. While this basic idea turned out to be unexpectedly useful, it is by its nature limited because it captures only one way in which humans beings consume information. Increasingly, internet users have demonstrated that they require both forms of information consumption, and since the web and its core technologies envisioned only lake information, solutions supporting the river activities have been built primarily by private technology companies.

The social media platforms Facebook, Twitter, Tumblr, Pinterest, Instagram, YouTube, and others, provide a type of aggregated feed to their users, giving them the ability to passively consume information of interest to them, ranked and filtered based on data provided by the user back to the platform. This feedback is absolutely essential in the age of the web: it provides the means to distill the firehose of data constantly produced into something interesting and relevant to each individual. But there is one major problem: the algorithms driving the generation of these timelines are opaque. Even more troubling is that these companies embrace a single business model: they are free to their users. Therefore, their profit motive is effectively licensed to third-parties who pay for the right to access user data, control what they see, or both.

In the latter years of the 2010s it became apparent that enough of these third parties have nefarious interests that the ubiquity of Facebook and Twitter is adversely affecting society, education, democracy, and mental health. We will not here recount the evidence for these assertions as they have been thoroughly discussed elsewhere (see especially "The Information Diet" by Clay Johnson; "Zucked" by Roger McNamee; and "10 Reasons for Deleting All Your Social Media Accounts Right Now" by Jarod Lanier).

Our goal here is to discuss solutions.

## 2. The Basic Idea

Various attempts have been made to build distributed social networks that break the reliance on any individual platform. The main challenge facing distributed social networks is the same facing any social network: critical mass. Simply put, there is no purpose in being the first one to join a social network and little purpose to being the first one of your friends to do so. Thus, whatever the reasons for the success of the current social media giants, any new technology needs to overcome their significant starting advantage.

We believe a better path is in working with existing structures, including with the existing social networks where possible. It is noteworthy that the “blogosphere”, especially in the mid- to late-2000s, provided an experience very similar to social networks today, including the ability to interact with friends, comment on and reblog their posts, see who they follow, and publish your owns feed. RSS readers provide a way to collect and update other users feed in a central place. What they generally do not do is filter or sort posts based on a users interests, nor do they allow publication of a feed.

### 2.1. JSON Feed

RSS was originally released in 1999 from Netscape as a way for websites to publish new information (such as blog posts) in a machine-readable format that can then be consumed by a news reader. The limitation of the RSS standard is that it was developed before many of the use-cases for feeds had been fully realized, and certainly before the current generation of social networks had solidified what many people expect from a feed. Therefore, a set of competing standards exist, and many ad-hoc extensions have been created to handle more novel uses. An example of this would be the URL for the audio file of a podcast. Because it was never included in the original standard, there are many creative ways of adding it, all of which RSS readers will generally ignore. Additionally, most developers find XML (the basis of RSS) difficult to work with and reason about.

The most widely-used RSS aggregator, Google Reader, was discontinued on March 13, 2013. The loss of this technology has led to a slow death for RSS - and the gradual withdrawl of RSS publication and consumption.

JSON Feed is a relatively simple data structure that - remarkably - remains information-rich enough to describe most types of feeds. RSS feeds/blogs, podcasts, the content of news websites, and Facebook and Twitter timelines could all be described by this data structure in a semantically meaningful and machine-readable way.

Our basic idea is produce tools that consume, aggregate, sort and filter the posts within JSON feeds. Additionally, a set of microservices should be built to translate RSS, Atom, podcast, and other types of feeds into JSON Feed. The combination of these two technologies will help to draw users away from consuming feeds in their current format towards JSON Feed.

Additionally, we envision the ability to author a JSON Feed as an independent entity: not attached to any particular existing social network or indeed any website. While such a “headless” feed could be used as an API for a blog, or indeed to cross-post to other social networks, it could also be consumed directly by other users’ feed aggregators, whether they are users of the same tools or not. This method of content authoring might be termed “feed-first”.

In sum, we should replace social networks with a set of JSON Feeds published by individual users, and consumed and aggregated by their friends.

### 2.2. Consumption and Aggregation

The basic user experience of RSS Readers has been established for some time. A user adds a set of blog feeds, which they can come back to later. A user can view posts by any feed, all posts sorted by publication date, only unread posts, etc. Tools should be produced which provide this basic experience but work with JSON Feed as their primary data format. Therefore, a set of translation services should also exist to produce JSON Feeds from RSS and Atom feeds. Ideally, users could curate/decide which translation services are available, giving them access to seemingly disparate types of information in a single place.

It is interesting to observe that the basic information in a Facebook or Twitter post could be represented in JSON Feed as well. With proper OAuth credentials, it should be possible for users to subscribe to updates from their friends on the major social networks and combine these into their feeds.


### 2.3. Algorithmic Sorting

A key feature of the current generation of social networks is that they elevate posts which an algorithm has deemed interesting to a particular user. We make no claim over what users should be reading: we do advocate that the algorithms should be transparent and they should be controlled by the user. Users should have the ability to uprank or downrank a particular type of post, and this ranking may even be done implicitly by observing which posts they click on or scroll past. But it is essential that this data be made available to them just as it is made available to the algorithm. And it should not be sold to third-parties.

### 2.4. Publication

Perhaps the most attractive feature of social networks is the ability to become a publisher rather than a simple reader. Setting up a website or blog in 2019 is hardly any easier than it was in 1994 - in fact, users are faced with a bewildering array of choices of hosting, software, and domain registration. Meanwhile, "posting" on Twitter or Medium could hardly be easier.

Blogging platforms like WordPress do allow users to write on their own website, but by closely coupling the content-authorship and external-website parts of the technology, make it hard for users to move off the same platform. At the same time, web content is increasingly published in a wide variety of formats simultaneously: in addition to the basic website, there are RSS Feeds, email alerts/newsletters, accelerated mobile pages (AMP), Facebook instant articles, and so on. A cottage industry has grown up to help content authors publish in all the necessary formats to feed traffic on the sites the content was written for in the first place.

A far simpler solution is to publish machine readable content, and allow other services to re-publish to the necessary services and the web. We think JSON Feed is a rich enough data format to handle most blogs and content sites.

Of course, any content published as a JSON Feed would also be consumable by a JSON Feed reader. It would even be possible to "re-blog" content from one feed into another. At this point, we would have a distributed social network.

## 3. Other Social Network Features

Social networks provide other features beyond reading and writing posts, some of which are harder to achieve with a distributed system based on JSON Feed than others. As stated, we are not specifying a particular service, so perhaps the community will innovate in this space beyond any particular ideas and limitations we identify here.

Nevertheless, we do provide some thoughts below on how things could be done.

### 3.1. Media

Any repository for user feeds will also need to provide storage of static files. Files could be referred in content within HTML tags (example images) or could be the "primary" resource for a particular post. For example, a Podcast post would use the "media_file" attribute within JSON Feed for the primary audio file. The JSON Feed Reader, upon recognizing this type, would provide an audio player for the user.

### 3.2. Commentary and Replies

Links on the web work in one-direction and a distributed system fundementally makes it harder to trace when one post comments on another. Several solutions have been devised and some were in widespread use in the mid-2000s blogosphere: WordPress still implements trackback and pingback endpoints as a supplement to comments. The newest of these is the [Webmention specification](https://github.com/converspace/webmention/blob/master/README.md). It would certainly be possible to include a Webmention endpoint as well as tracking mentioning posts in extensions to JSON Feed.

### 3.3. Liking

Liking could theoretically be implemented the same way as Commentary - an endpoint that tracks positive feedback from other users. It also highlights the fundamental problem of honesty: if posts are expected to keep track of their own likes (and mentions) there is nothing stopping them from artificially inflating them. As our goal is to produce a system to capture content of interest to individuals, we are willing to live without Likes as a feature.

We note that this problem of honesty is not limited to distributed social networks: fake Likes are a problem for platform social networks as well, they just require fake accounts to produce. Perhaps the lack of this feature is actually desirable.

### 3.4. Re-sharing

Another feature of existing social networks is the ability to re-share, re-tweet or re-blog content of interest to one's own followers. This is quite easy: it simply requires copying the post content while preserving the author fields from the original feed. It does highlight the problem of content ownership, but this is also a limitation of platform social networks.

### 3.5. Profiles: Publisher Identity

Existing social networks contain some data about the feeds author. This is encoded at the top-level `author` object within the JSON Feed specification. A more nuanced problem is one which Twitter addressed with "checkmark" or "confirmed accounts": that of associating publisher identity with identity that is commonly understood. In other words, if a feed is published by "Michael Bolton", can a reader be assured that it is published by *the* singer Michael Bolton, and not an impersonator or - perhaps - someone with the misfortune of having the same name.

While there is perhaps no totally satisfactory solution to this problem, it is perhaps less likely to be an issue than on platform social networks, as feeds would be hosted on a domain at the impersonators' expense (either directly or indirectly).

### 3.6. Privacy: Consumer Identity

While public profiles and feeds were the primary motivation of RSS and JSON Feed, and central to the design of many social networks, there is also a need for private communications that take place in a broader concourse than one-on-one messaging, but not open to the entire world. Assuming the network of feeds is sufficiently distributed, traditional authentication methods are not up to the task. Secret URLs are possible, but provide no mechanism to revoke access. JWTs provide some possibilities for sharing data between feed servers.
