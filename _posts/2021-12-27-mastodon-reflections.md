---
layout: post
title: "Reflections on a month of Mastodon"
description: "Some thoughts about mastodon after about a month of usage."
author: Dusty
tags:
- software
- mastodon
- social-media
- social media
---

## Mastodon like it has been

The great Twitter migration feels like a call to rethink how we interact with
the world. There are a lot of options out there with
[Mastodon](https://buffer.com/resources/mastodon-social/), and the larger
[fediverse](https://en.wikipedia.org/wiki/Fediverse), taking center stage among
my peers.

Coming from Twitter, Mastodon is challenging to break into. Reminiscent of IRC,
a users first interaction with Mastodon is to be confronted with picking an
instance to call home. Unlike what users have become used to over the past
decade of social media, Mastodon is not a singular place. It's a connected web
of places. This challenge is Mastodon's first weakness exposed but, I believe,
also it's greatest strength.

The best thing about Mastodon is it's open nature. It's built on an open
protocol, ActivityPub, that connects each of the instances in the Fediverse.
What's greater is that the protocol doesn't restrict that all instances
must be Mastodon at all. Mastodon is a single reference software implementation
of ActivityPub, exposing one possible interaction model.

![Screenshot of PixelFed](/img/posts/mastodon/pixelfed.jpeg)

Other software can be made to use ActivityPub and connect with existing
software in the Fediverse. One example is [PixelFed](https://www.pixelfed.org).
It's made to look and feel a lot like Instagram and any PixelFed or Mastodon
user, indeed any user in the Fediverse, can subscribe and images posted to a
PixelFed account will show up in their feed. These software all speak a
common language of "posts", "follows", and "replies", but they may display
them differently with a focus on different types of content.

The classic analogue is email. You can have an email account with Yahoo,
while I have one at Gmail, and someone else hosts their own email domain
with their blog host. Each of these has a different server and client
implementation linked together by SMTP (the email protocol) and I don't
need to know anything about yours to interact with you. What's more, your
interaction with email may be very different than mine. You might love the
classic feel of Outlook, I prefer to get things done quickly using Google
Inbox (may it rest in peace).

Because of the existing momentum within the platform, it's likely that most
people will end up using Mastodon, as provided by one of the big nodes,
(e.g. Mastodon.social, Mastodon.online, etc) to connect to the fediverse. For
someone joining from Twitter, a big Mastodon instance is relatively
comfortable. It has a familiar interface and interaction model that mostly
mirrors the features and functionality of the Twitter web interface. And a
large, central instance mirrors the relationship folks have had with Twitter.
But there could be so much more potential when your relationship with Mastodon
looks like @yourname@yourdomain.io.

## Mastodon like it could be

But again, like email, the open nature of ActivityPub affords many interaction
models. And that feels like it's worth leaning in to. When twitter worked best
for me, it was primarily a way to connect with friends, build a network, and
learn novel things. Eventually, Twitter devolved into a way for me to consume a
consistent drip feed of garbage vitriol. Doom scrolling, with little real
interaction. I'd like to avoid getting there again if I can help it.

Some folks want social media to be that consume-mostly drip feed. Others would
do better with a publish-mostly interaction mode. For some, it would make sense
to do both of these things separately! What's interesting is that it seems like
the Fedierse could be molded to suit either mode more naturally than Twitter
ever was, possibly with purpose-built software for each mode. And, possibly,
for some users, with different _identities_ for each purpose.

Thinking about ActivityPub in general has led me to disaggregate the parts of
social media in my mind in a way I hadn't before. It's become very clear to me
that there are two distinct parts, writing/publishing and subscribing/reading.
Mastodon, like twitter before it, treats posting, reading, replying, and
boosting with equal weight. They all show up in the timeline the same size and
taking the same space.

But these things needn't be weighted the same for all people all the time.
ActivityPub frees us to change the weights of different types of content
depending on the mode we're operating in. Contrast twitter to a blog or
tumbler. On those platforms, comments are secondary and the post takes center
stage. They're part of the conversation, but the post is central and the a
conversation is owned, controlled, and moderated by the OP.

For someone looking to mostly create content to share, while it seems a bit old
fashioned, an ActivityPub client that looks and feels like blog software might
actually be just the right experience. WordPress has a suite of plugins that
enable just this experience and I'm looking forward to other blog software to
do the same.

On the other end of the spectrum, an interface that makes consumption first-
class could be a great as well. I'm thinking of something like the old Google
RSS Reader interface, putting each post forward and the conversation of
replies threaded beneath. Instead of encouraging following hundreds or
thousands of people, making for a rapidly moving feed of noise users are
rewarded for following creators that make great long-form content prompting
thoughtful discussion.

I'm really excited by the idea of re-invorgorating this old blog with an
ActivityPub flair. I'd love to let this be my primary publishing identity,
owning my words in this space, but pushing them out to followers in the
Fediverse. I'll probably maintain other identities in the Fediverse as
well for consuming and interacting with others. But, starting from a place
of creation rather than consumption feels like a big improvement from where
I left of with Twitter.
