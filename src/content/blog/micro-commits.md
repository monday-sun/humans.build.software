---
title: 'Micro-Commits'
description: 'Commit and forget'
author: 'monday-romelfanger'
pubDate: '2024-04-13T00:00:00Z'
updatedDate: '2024-04-21T01:15:22.000Z'
tags:
  - 'micro-commits'
  - 'development-process'
image:
  src: /assets/img/micro-commits.png
  alt: 'A flat-style digital illustration shows a cream-colored document with a red-orange header and golden-yellow lines, symbolizing text. A yellow circle with a checkmark overlaps the bottom corner of the document. Behind it is a large coral-red circle. The background is soft mint green, using a calm, minimal color palette.'
draft: false
---

As software engineers, we expect too much from our brains. We expect to hold onto enough context to make new features without breaking existing ones and rarely with enough test coverage to ensure we didn't break something. Our brains don't have as much [working capacity](https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two) as we'd like to believe.

## Pre-requisites

This article assumes you're using git, but you could use any other tool that allows for lots of branching, frequent commits, and, preferably, squash merging.

## Description

'Micro-commits' is a development process that relieves your brain from holding onto so much information, with a ton of side benefits. At its core, it's easy to describe: make the absolute smallest decisions and commit to them. This process is especially great for working with any code you didn't write because it directly captures your learning into the code.

## Process

### 1. Find a file you want to change and make a new branch

This doesn't have to be exact; start somewhere reasonable for your task. You may also want to start a build and tests in watch mode if you have one available.

### 2. Write one insight into your code

Add one test, rename one variable or method, extract one method, or make one small feature change. It should be the smallest decision you can make.

_**Your build should succeed; tests should pass**_ (unless you intentionally added a failing one).
Initially, it will feel awkward to break up changes this small, but you'll get a better sense of what's reasonable as you practice. Stick to one thing per commit to start.

### 3. Add your changed files and commit

Use a standard commit prefix pattern to indicate the risk associated with the change.

### 4. Repeat steps 2 & 3 up to 14 times

Follow your ideas, and keep writing down one thing at a time. Each commit is one step forward, and we always want to capture as much progress as we can, even if we go down the wrong path. If you need to backtrack, do `git reset --hard` until you get back to your last good change. Repeat until your item is complete or you have a meaningful set of changes. Don't do more than about 15 commits, or your change will become hard to review. Use your judgment, but stick to 15 to start.

### 5. Review your complete set of changes

- Does the build and tests pass? If not, fix any issues or reset to the last working change.
- Use `git diff main` or push your branch to its remote host (Github, GitLab, etc.) and review the changes.
  Is it explainable? If so, move to step 6. If not, you can either reset to the last explainable set or create a new branch and start over at step 1.
- You want a change that someone can review in < 5 minutes while still providing forward movement on any work item, no matter the complexity of the code.

### 6. Do your standard code review or merge process

## Commit Prefixes

Because you're committing frequently, it's best to have a set of prefixes you default to adding to the front of each commit. The prefixes are the most meaningful and essential part of a micro-commit message. They should tell you and your reviewers the level of scrutiny any individual change requires, so ideally, your team would understand their meaning as well. The rest of the message can be helpful context but can be kept very simple.

### Example Prefixes

These are the prefixes I use, but I often see others mix up MANUAL, RISKY, and FEATURE. Find a set that makes sense for you.

| Prefix   | Meaning                                                                                                                                                                      | Example                                            |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| COMMENT: | I only changed comment/white space                                                                                                                                           | COMMENT: updated comment on MyClass                |
| TEST:    | I only changed or added a test                                                                                                                                               | TEST: added missing test for MyClass               |
| TOOL:    | I used a tool to do this task, including renames<br/>and file moves done with IDE tools, especially if a compiler will<br/>validate it. If appropriate, include the command. | TOOL: nx g library my-new-lib                      |
| MANUAL:  | I followed a [safe refactoring technique](https://refactoring.guru/refactoring/catalog) to make this change.                                                                 | MANUAL: moved someMethod to new class              |
| RISKY:   | I did not follow a safe refactoring technique,<br/>but I believe this should have no behavior change                                                                         | RISKY: moved registration from ModuleA to Module B |
| OOPS:    | I made a mistake previously that I need to fix                                                                                                                               | OOPS: fix incorrect import                         |
| FEATURE: | I changed the behavior to do something new                                                                                                                                   | FEATURE: implemented someNewBahavior               |

## FAQ

### Do you always make commits this small?

Yes, but it took some time to adopt this process. Now, it's harder not to—I'm even doing it while [setting up this blog](https://github.com/monday-sun/monday-sun.github.io/pull/12/commits).

### Do you really throw away and redo work?

All the time. In any other creative task, we make rough drafts. In knitting, we use lifelines as save points that we can go back to if something goes wrong. Writing software is a creative task, too, so you must try, fail, and try again. Because I'm committing so often, I have a record of everything I did, and I use hard reset or a new branch to toss out the ideas that didn't go anywhere.

Sometimes, I ignore the 15-commit limit and see what happens. I'll learn a lot and have a lot of good commits sitting in an unreviewable branch. In that case, I make new branches and cherry-pick the good ideas or recreate them since they're so small.

### How do you stay so disciplined?

This process gives me the freedom to be less disciplined. Making the process a habit is disciplined, but it gives me much more control over the risks associated with any change. I'm less worried about breaking things and missing tests when I know where I might have messed up. I use that to make impactful changes in the scariest parts of a code base, including untested and un-release-flagged code.

### What do I do while waiting for a code review if I didn't finish my task in 15 commits?

There are a couple of options here. The hardest part of continuing to make changes is dealing with the merging, especially if you have to respond to feedback.

#### 1. Create a new branch and follow a different thread of insight

Most tasks will have multiple threads you need to follow. If other things need changing that have minimal overlap, you can create a new branch and work on those. I'll often merge four or so of these branches before having a branch that brings them all together.

#### 2. Create a new branch from the original branch

If you need to keep following the same thread or another that overlaps with the current changes, it might be easier to branch from that branch. Once the first branch is merged, use [`git rebase --onto`](https://womanonrails.com/git-rebase-onto) to rebase onto `main`. You can also use this idea if you get too far into a new thread before you realize it.

## Credit

I was originally taught this process as part of Arlo Belshee's [Read-by-Refactoring](https://arlobelshee.com/the-core-6-refactorings/) class at Tableau Software.
