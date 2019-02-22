---
layout: post
title: "Race Conditions Like I'm Five"
description: "A quick explanation of the concept of race conditions"
author: Dusty
tags:
- programming
- race condition
- concurrency
---

A friend recently asked for an explanation of race conditions in computing. I came up with a
quick definition and a short example that I really liked so thought I'd share:

### Explanation
Say you have two (or more) threads of execution (threads, processes, background workers, async
callbacks). If there’s a situation that could happen where a resource (file, object in memory,
row in the database) could be modified by one in such a way that the other would fail (error,
corrupt data, unhappy users) depending on order of execution, that’s a race condition.

### Example
I check in the morning that there’s a donut in the box on the counter and note to myself that
I want to eat that donut when I get back from work. It's a chocolate covered buttermilk old
fashioned and I'm super excited about it.

Later, my wife also checks that there’s a donut in the box on the counter and notes to herself
that that donut sure would make a tasty afternoon snack. She loves old fashioned donuts, too.

After doing some chores around the house, my wife grabs the donut and snacks away.

I arrive home, expecting a fantastic donut to be available to monch on, and find only an empty
box.

I have a sad. A donut sad. The worst kind of sad.

Unknown to each other, we raced for the donut. My wife’s work on this particular day took less
time than mine, and she got there first. I get no donut, even though I was certain there was a
donut to be had. On another day, maybe I would have gotten the donut first and my wife would
miss out.

That uncertainty, that's a race condition.
