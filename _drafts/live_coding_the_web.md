---
layout: post
title: "Live coding the web"
description: "Stuff"
author: Dusty
tags:
- software
- concepts
---

I recently saw a talk at LambdaJam introducing the concept of live coding. It was applied specifically to musical performance and physics simulations.

I'd like to explore building a connect-like middleware framework that would allow one to live code middleware and load it into a running web server.

I think this could be accomplished in JavaScript... perhaps using eval (yuck)... to reload middlewares that are loaded into a map and referenced by the middleware engine.
