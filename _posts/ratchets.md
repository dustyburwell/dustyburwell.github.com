---
layout: post
title: "Ratchets: Improving systems incrementally"
description: "Improve your system gradually by establishing a baseline and never looking back"
author: Dusty
tags:
- software
- concepts
- practices
---

If you've ever used a ratchet strap, you'll know that it's an incredibly useful tool. A ratchet strap is 
a type of tie down strap used to hold large objects onto a vehicle for moving. No knots are required,
unlike rope, and they have less give and room for error than bungee straps. The ratchet strap gets its
name from the specially designed gear box that's used to impart tension on the strap and hold down your
stuff. During tensioning, the ratchet gear only moves in one direction, spooling slack onto an axle. As
slack is brought in, the gear is physically restrained from reversing. It's a simple, but powerful,
mechanism.

I was recently listening to [Eileen Uchitelle][0] on the [Hanselminutes][1] podcast describing their work
to [upgrade GitHub's Rails version from 3.2 to 5.2][2]. Upgrading a core framework on such a large and
heavily used site is a tremendous feat of engineering and I recommend checking out the interview and
reading [GitHub's blog post][3] about it as well. As they were describing the process in the interview it
got me thinking about ratchets in software systems.

Eileen mentioned that one of the things they did to aid in upgrading the system was to run parallel
builds of GitHub, the standard build on the current Rails version to catch regressions and also a second
build running the version that was targeted for upgrade. Failures in the second build wouldn't block
developers from proceeding with their changes or deploying, but would give Eileen signal about which
parts of the codebase still needed attention before upgrading. When the upgrade targeted build
stabilized after changes were made to support the new version of Rails the secondary build would be
switched on as a blocker ensuring that other developers had to code to the new standard. Other
developers would no longer be able to introduce changes that were incompatible with the targeted version
of Rails. This ratcheting process allowed for incremental progress to be made in compatibility with the
latest version without needing to stop the world of development for the rest of the team. 

Ratcheting is a powerful pattern in software maintenance and migration. It can be found in a number of
different practices.

* Deprecation of a method or API functions as a warning to developers that the gilded path has changed
  and that the interface they're using will soon change. Depending on the environment, usage of a
  deprecated interface may produce log messages or compiler warnings or errors. When the developers
  have cleared all warning messages, they can rest relatively assured that they can upgrade to the next
  version of the API or framework without compatibility issues.

* Linters like [Rubocop][4], [Prettier][5], or [SpotBugs][6] are great for automatically ensuring your
  codebase adheres to a style standard and can also be used to root out code patterns that are known
  to be buggy. In a large codebase, turning on a new lint rule to root out a common anti-pattern can
  often be a grueling process with new infractions turning up while attempting to clear out old ones.
  But most linters allow rules to be disabled with comments inline in the code:
  
  ```
  x = x + 1 # rubocop:disable NoIncrementingVariablesCheck
  ```
  
  Linters also often have a way to centrally disable rules based on file name, e.g. 
  `.rubocop_todo.yml` for RuboCop. Enabling a rule globally and adding exclusion directives allows
  you to quickly turn on the rule and prevent new infractions, ratcheting down on the bad practice,
  so that existing cases can be cleared out leisurely. The linter will also yell at you when an
  exclusion exists for a file or line that doesn't break the rule so that you remember to remove it.
  Using linters in this way allows you to incrementally ratchet your codebase into better shape and
  make sure bad practices don't come back.

* "Wholesome" tests are similar to lint rules in that they make assertions about the structure of
  your code at compile / build time, though generally in ways that a static view of the code
  can't. I've only seen this in use on relatively large codebases where structural migrations might
  involve hundreds of files and multiple pull requests. They are another tool that can be used to
  fill the gaps in our type system. These are especially useful in dynamic language codebases like
  Ruby, Python, or Javascript.
  
  A wholesome test might validate that a required codegen step has been run before check-in or that
  all model classes have have required data annotations for Personally Identifiable Information
  (hello, GDRP). You could also use a wholesome test to check all indexes defined for a database
  table are reasonable and only include columns that are actually defined by the DDL or that
  defined database names don't contain are all plural or reflectively check that all `Widgets`
  adhere to the new `Foo` interface so you know it's safe to decommision the old `Bar` process.
  
  If you add an allow list to the test, you can introduce the check, ratcheting down on new
  infractions, and giving yourself the room to complete the migration.
  
  ```
  class ElevenSource < PrimeSource
    def self.prime
      11
    end
  end
  
  # Yes this is ridiculous
  it 'ratchet down usage of odd numbers as primes' do
    ALLOWED_ODD_PRIMES = [1, 3, 5, 7, 11]
    
    ObjectSpace.each_object(Class)
      .select { |klass| klass < PrimeSource } # Find all sources of prime numbers
      .each do |prime_source| 
        prime = prime_source.prime
        next if prime.even?
        assert(ALLOWED_ODD_PRIMES.include?(prime), 'Make sure to only use even primes!')
      end
  end
  ```

* [Test coverage metrics targets][7] may be somewhat contriversial but offer another peek at
  software ratchets in practice. Code coverage metrics tools universally report on test coverage,
  but many also allow you to set targets for test coverage such that a build will fail if coverage
  slips below a specified percentage. Your codebase might have a meager 50% coverage, but by
  setting that as a CI and deploy blocking target, going forward you can be assured that your
  coverage will never go below that. Add some tests to a few key locations and then you can set
  your target at 60%, and so on. This kind of CI based metric target can be used for ratcheting
  a number of metrics including test execution time or performance of a specific critical path.
  
* There are a lot of opinions on API versioning and how to do it. I like to think Stripe
  implements [API versioning][8] in an interesting and particularly useful way. It's also another
  great example of ratchets in software. When a new customer signs up, their account is pinned to
  the latest version of the API via service side configuration. When new compatible changes are
  made to the API, those changes are immediately available to all API users regardless of their
  version.
  
  When backward incompatible changes are made to the API, a new "version" of the API is stamped
  and compatibility is maintained for old versions of the API with gates and compatibility layers.
  The version globally will ratchet up, preventing new customers from using older versions. At any
  point a customer can temporarily "upgrade" their version of the API by sending a version header.
  Once they're satisified with the changes to their integration, they can permanently upgrade by
  changing their version in the Stripe dashboard, ratcheting their API version up to the
  next version.
  
  On the Stripe side, old versions are deprecated when new are introduced so that no new customers
  will ever use an old version. Compatibility layers can be removed and when users are no longer
  using an old version. 
  
* [Gradual typing][9] is a pattern common to tools that add types to previously dynamic languages.
  [TypeScript][10] and [Sorbet][11] use this pattern to add static type checks to incrementally to
  JavaScript and Ruby codebases respectively. With these tools it's possible to gradually increase the
  restrictiveness of the type system on specific subsystems while allowing the rest of the system to
  exist as is today.
  
  While certain variables or function inputs/outputs may be typed restrictively, TypeScript's `any`
  type and Sorbet's `T.untyped` allow particularly tough cases to be ignored. Directives can be used
  to then ratchet up the strictness of the type system on a per-file basis.
  
  ```
  # typed:false|true|strict|strong
  ```
  
  With the proper configurations in place, you can ensure that new files are added with more strict
  typing rules in place while the rest of the system slowly catches up.

The software ratchet is a very powerful pattern for the long term management of systems. Tools
with ratchets enable large complex migrations to improve code quality or upgrade systems 
gradually. As software engineers, we often valorize the new and shiny, but so much of our time
is actually spent maintaining, managing, and upgrading existing systems. Without the ratchet pattern
it's hard to say that major upgrades like the multi-major-version Rails upgrade Eileen performed
would even be possible. Where else have you noticed the ratchet pattern in practice? What other
patterns exist that are useful for long term maintenance and system upgrade? Let's talk about it in
the Twitter replies!

[0]: https://twitter.com/eileencodes
[1]: https://www.hanselminutes.com
[2]: https://www.hanselminutes.com/657/upgrading-github-and-improving-rails-with-eileen-uchitelle
[3]: https://githubengineering.com/upgrading-github-from-rails-3-2-to-5-2/
[4]: https://github.com/rubocop-hq/rubocop
[5]: https://prettier.io/
[6]: https://spotbugs.github.io/
[7]: https://www.thoughtworks.com/insights/blog/are-test-coverage-metrics-overrated
[8]: https://stripe.com/blog/api-versioning
[9]: https://sorbet.org/docs/gradual
[10]: https://www.typescriptlang.org/
[11]: https://sorbet.org/
