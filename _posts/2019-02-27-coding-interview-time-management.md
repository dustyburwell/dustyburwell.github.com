---
layout: post
title: "The Coding Interview: Time Management"
description: "Improving your chances at coding interviews by managing your time."
author: Dusty
tags:
- advice
- career
- interviewing
---

Time is your most valuable asset during a coding interview and it’s ticking away from go. Let's talk about some
tips for maximizing your time in a coding interview. I'll preface this advice by saying that this is based soley on
my experience being interviewed and giving interviews. It won't necessarily be applicable to all interviews as some
interviewers certainly look for different things. But, in my experience, these considerations have frequently
helped me.

## Set up your environment in advance
Save some time in the interview by making sure you're ready to write and run code in your language of choice before the
interview ever starts. If the recruiter you're working with doesn't offer up guidelines on language and environment, be
sure to ask. If you're able to use your own local environment with your preferred tools, that's great. But, ensure you
have the environment set up with project and test file boilerplate so you're ready to build, run, and test. Any time
spent debugging your environment during the interview is time you can't spend writing code.

## Read or listen to the instructions carefully
If the instructions are written, read them carefully. Make notes of specific requirements that your solution should
consider. If the instructions are verbal, again, take notes. This way, you can refer back to the most important bits
later if you forget something. If the instructions aren't clear, ask for clarification. There are rarely points for
a solution that solves the wrong problem. And if you miss a requirement that was clearly stated in the description
of the problem you'll either lose points or time going back to fix what you missed. When there are specific
requirements in the problem statement, consider writing tests to cover them.

If it's not made clear in the instructions, ask what qualities the interviewer is hoping to see in your solution.
Often clear code and test coverage of edge cases are primary, but sometimes performance, memory utilization, or a well
factored solution are emphasized. It's important to know as much about the rubric upon which you'll be judged as
possible so you can tailor your approach. If at any time the interviewer says something that's not clear or that you
don't understand, don't be afraid to ask for clarification.

## Start coding quickly
Just like the real world, the primary measure of a coding interview is working software. Most coding interviews are
testing the basic requirement that you are able to translate a set of requirements into code that works. Other things
matter, code readability, structure, factoring, test coverage, but working code is number one. Start getting code into
the editor as early as you can. Write tests, write method signatures, write a naïve implementation, write something.
Also, unless it helps you to internalize the problem and think through the proper solution, skip the pseudo code and
the comments. I can ceratinly assure you that this kind of comment has never won anyone points on an interview:

```ruby
# Iterate over the records
records.each do |r|
 …
end
```

We want code that runs and code that works as early as possible. Even if your solution is naïve and the interviewer
says they care about CPU performance, once we have something working we can iterate to make the naïve solution
faster or explore alternatives. But at least you have something that works. If your code is messy, we can rename,
refactor, and rework. But at least you have something that works. 

Speaking of refactoring, do refactor aggressively. If you notice that you're writing the same code or structure a
couple of times, extract a method. Not only will this make your code clearer it will mean you don't have to write
that code again. 

## Run tests early and often
If test cases are provided for you, get them into a format that will run as tests quickly and run them, even if
you're sure your solution doesn't execute. I have my local environment set up with a file watcher and 
[Stopplicht](/2014/07/12/stopplicht) so that I get quick feedback whenever I save files in my editor.
Again, make sure your environment is set up in advance to help you succeed. Run the test cases handed to you, run
tests to cover requirements from the instructions, and run tests to cover edge cases. Whatever you do, never,
never, never manually step through test cases, you’re wasting a lot of time when the computer can run through tests
faster than you can blink.

If you find yourself in a situation where you have code that doesn't work and you can't intuit your way to a quick
bug fix, take a systematic approach to debugging. Isolate buggy methods or classes and test those specifically. Pay
special attention to conditionals and bounds checking. It helps to be familiar with interactive debugging tools
available to your language of choice, be it an IDE for Java or C# or pry-byebug or similar for Ruby, so that you
can step through and quickly identify bad behaviors. But, don't be afraid to resort to printing logs to the console
checking values in variables or if a particular path is executed.

---

There are probably a thousand other things to keep in mind when stepping into a coding interview, but I've found
that there are common stumbling blocks that these tips would help to overcome. Whether you're preparing for your
first coding interview or your thousanth, I hope this advice helps you to walk into the room with a bit more
confidence.
