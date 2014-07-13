---
layout: post
title: "Introducing Stopplicht"
description: "A quick introduction to the Stopplicht osx state indicator."
author: Dusty
tags:
- software
- projects
---

The feedback loop is an integral part of the process of Test Driven Development. Red, Green, Refactor... and hopefully still Green. The faster you can move between the states in the cycle, the better. To help visualize those states and continue tightening the feedback loop, I built [Stopplicht](http://github.com/dustyburwell/stopplicht).

![demo](/static/stopplicht/animated_demo.gif)

For web development, I generally like to have my editor, a terminal session, and a browser open at a minimum. This is all in an effort to tighten the feedback loop. Saving changes in the editor kicks off a test run restarts the web server in the terminal session. The terminal spits out an <code style="color: limegreen">OK</code> from the test run and a quick `F5` refreshes the browser to reveal the magic you made.

When coding on the go, screen real estate is at a premium. Even on a 15 inch laptop screen, all of those windows start to feel cramped very quickly. Something has to give. Unfortunately for me, that usually means using multiple virtual desktops or `⌘+tab` to switch between windows in order to get the feedback I so desperately need. This leads to increased cognitive friction. The context switch can even be enough to break you out of *the zone* if there are enough distrative windows behind your editor.

I looked for a solution to this problem and found [blink(1)](http://thingm.com/products/blink-1/) and [Starting Blocks](https://github.com/darrencauthon/starting_blocks). Blink(1) is a small programmable LED dongle you plug into your USB port. And, among other things, Starting Blocks integrates minitest with the Blink(1) to display test feedback on the LED.

![blink demo](/static/stopplicht/blink_demo.jpg)

I built Stopplicht as an alternative solution for those who can't or don't want to invest in the extra LED hardware. As an indicator, it's small and out of the way in your menu bar, but still visible for quick feedback. It runs a small tcp server and responds to network interactions, but also has a simple command line interface for ease of integration.

The CLI makes it easy to monitor the state of any command line process. I tend to pair it up with [Wach](https://github.com/quackingduck/wach) to kick off and monitor all kinds of processes tied to file edits. In fact, I'm using it with Jekyll right now to rebuild this blog every time I save this post. Stopplicht is already integrated with [Starting Blocks](https://github.com/darrencauthon/starting_blocks-stopplicht) and I'll be working to integrate it with other test runners soon.

For more information on using Stopplicht or to view the code, check it out on [Github](https://github.com/dustyburwell/stopplicht).
