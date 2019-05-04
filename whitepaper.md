
Feeds as Distributed Social Networks: A Proposal for Open-Source and User-Controlled Timelines
==============================================================================================

Casey A. Ydenberg,^^

# 1. The Problem {#MPSection:BB7508E2-A7F9-4D63-A8BB-3EAE769B1600}

Broadly speaking, the experience of information consumption can be sorted into two categories: often thought of as rivers and lakes. Lake information is primarily static, and can be browsed, or otherwise actively sought after. Library and encyclopedias provide examples of lake information. By contrast, river information is always chaging, and is usually consumed more passively. Television broadcasts and newspapers are example of river information.

The mental model of the world-wide web, as originally conceived by Tim Berners-Lee and later realized during the 1990s, was as a set of pages organized into websites and linked via hypertext. While this basic idea turned out to be unexpectedly useful, it is by its nature limited because it captures only one way in which humans beings consume information. Increasingly, internet users have demonstrated that they require both forms of information consumption, and since the web and its core technologies envisioned only lake information, solutions supporting the river activities have been built primarily by private technology companies.

The social media platforms Facebook, Twitter, Tumblr, Pinterest, Instagram and YouTube (and others) provide a type of aggregated feed to their users, giving them the ability to passively consume information of interest to them, based on data provided by the user back to the platform. This feedback is absolutely essential in the age of the web: it provides the means to distill the firehose of data constantly produced into something interesting and relevant to each individual. However, there is one major problem: the algorithms driving the generation of these timelines are opaque. Even more troubling is that both companies are for-profit enterprises which are free to their users: their profit motive is effectively licensed to third-parties who pay for the right to access user data, control their timelines or both. In the latter years of the 2010s it became apparent that enough of these third parties have nefarious interests that the ubiquity of Facebook and Twitter is adversely affecting society, education, democracy, and mental health. We will not here recount the evidence for these assertions as they have been thoroughly discussed elsewhere (\*\*), and our goal is to provide solutions.

# 2. The Basic Idea {#MPSection:E108C6E1-4D0C-42B1-89FC-CD0D1A42E9A8}

Various attempts have been made to build distributed social networks that break the reliance on any individual company. The main challenge facing distributed social networks is the same facing any social network: critical mass, otherwise thought of as “network effect”. Simply put, there is no purpose in being the first one to join a social network and little purpose to being the first one of your friends to join one. Thus, whatever the reasons for the success of the current social media giants, any new technology needs to overcome their significant starting advantage.

We believe a better path is in working with existing structures, including with the existing social networks where possible. It should be noted that the “blogosphere”, especially in the mid- to late-2000s, provided an experience very similar to social networks today, including the ability to interact with friends, comment on and upvote their posts, see who they follow, and publish your owns feed. RSS readers provide a way to collect and update other users feed in a central place: what they generally do not do is filter or sort posts based on a users interests.

## 2.1. JSON Feed {#MPSection:59EEF19C-5087-4EDB-9A9F-731AE517B401}

RSS was originally released in 1999 from Netscape as a way for websites to publish new information (such as blog posts) in a machine-readable format that can then be consumed by a news reader. The limitation of the RSS standard is that it was developed before many of the use-cases for feeds had been fully realized and certainly before the current generation of social networks had solidified what many people expect from a feed. Therefore, a set of competing standards exist, and many ad-hoc extensions have been created to handle more novel uses. An example of this would be the URL for the audio file of a podcast. Additionally, most developers find XML (the basis of RSS) difficult to work with and reason about.

JSON Feed is a relatively simple data structure that - remarkably - remains information-rich enough to describe most types of feeds. RSS feeds/blogs, podcasts, and Facebook and Twitter timelines could all be described by this data structure.

Our basic idea is produce tools that consume, aggregate, sort and filter the posts within JSON feeds. Additionally, a set of microservices should be built to translate RSS, Atom, podcast, and other types of feeds into JSON Feed. The combination of these two technologies will help to draw users away from consuming feeds in their current format towards JSON Feed.

Most importantly, however, we envision the ability to author a JSON Feed as an independent entity: not attached to any particular existing social network or indeed any website. While such a “headless” feed could be used as an API for a blog, or indeed to cross-post to other social networks, it could also be consumed directly by other users’ feed aggregators, whether they are users of the same tools or not. This method of content authoring might be termed “feed-first”.

In sum, we should replace social networks with a set of JSON Feeds published by individual users, and consumed and aggregated by their friends.

## 2.2. Consumption and Aggregation {#MPSection:2A9ADF81-DFA6-46B6-A49B-A876859A8978}

## 2.3. Algorithmic Sorting {#MPSection:83A4977B-6F0F-4F4E-AF2B-7AAC586FF508}

## 2.4. Publication {#MPSection:E9C461EB-CE41-473D-AB61-6A038CB1E0C7}

# 3. Other Social Network Features {#MPSection:F8C31E0F-8319-472F-A62F-414A1E5D2AA8}

## 3.1. Media {#MPSection:2E6AD6D1-9710-412F-B2FF-F9B498B79A2A}

## 3.2. Commentary and Replies {#MPSection:7EC0E8F6-4367-4141-9576-CDB9F050B809}

## 3.3. Liking {#MPSection:F893AEF8-737D-4450-A7DF-B4228FBE490E}

## 3.4. Re-sharing {#MPSection:F5B8F8BA-8694-4066-BB56-93F01CA1291D}

## 3.5. Profiles: Publisher Identity {#MPSection:4218CEF7-D781-4D65-915D-855D12308F36}

## 3.6. Privacy: Consumer Identity {#MPSection:97179C67-EECE-4D86-8A1D-5C0E4E5C5581}
