---
title: "Monday's Weekly Notes: May 12, 2025"
description: 'Beginnings of Foundry'
author: 'monday-romelfanger'
pubDate: '2025-05-12T00:00:00Z'
updatedDate: '2025-05-12T16:00:00.000Z'
tags:
  - 'weekly-notes'
  - 'llms'
  - 'cursor'
  - 'development-process'
  - 'build-in-public'
  - 'mcp'
  - 'foundry'
draft: false
catImage:
  src: '/assets/img/cats/kane-sun.jpeg'
  alt: 'A calico cat naps on a dark gray couch, bathed in warm sunlight. Her front paws are tucked under her head, while her back legs stretch out beside a small bundle of colorful socks. The light catches the orange in her fur, adding to the cozy, peaceful scene.'
---

_Weekly Notes inspire others to experiment, give me a framework for reflection, and open up discussion around these workflows._

# New Project: Foundry

I had an idea at the start of the week. In short: what happens if I show LLMs how to build software in a process designed for collaboration and feedback, and offer it my hands + Cursor to do development? How far can we go?

## Background

One of my main issues with Cursor is how it feels like I have to prompt the same tasks repeatedly, in a way that makes me check out. Technically, each code change is new and unique in some ways, but a good software engineering process has very distinct phases, which can each be AI-assisted in their own ways.

So, I stepped back and looked at my [refactor-first workflow](https://humans.build.software/blog/refactor-first-feature-last) to ask: when and how I wanted to influence the process? For me, the answer was emphatically "Not in an IDE." The surface areas where I have the most influence are in ticket writing and PR feedback. I can affect a project's feature direction and quality through those moments.

I took this idea to ChatGPT, and we got started.

## Highlights

- ChatGPT generally grasped what I was asking of it. We simplified the workflow into fewer concrete steps, and it created tickets for defining each step as a prompt that I could manually kick off in Cursor for each step.
- We started at the beginning of the loop, where it can ask clarifying questions, then I completed the loop manually. Each ticket moved through the loop and got progressively easier as the structure settled in.
- When I ran into a step failing, I could ask it to evaluate the cause and include that in the bug ticket.
- Github's MCP came in clutch. I don't think I could have been that patient to work without it

## Friction

One of the most interesting aspects of this loop is how it enables me to flag friction and asks the LLM to help resolve it. That said, there's still a lot to do.

- Linear MCP doesn't work, so I'm manually shuttling info around.
- The initial prompts are not very good at helping the Cursor agent find the proper context, which is a problem in Cursor; I may need to split research out as a separate prompt.
- Transitioning from purely prompt-based to adding real code is a stumbling block. However, this might be due to failing to do appropriate research at the right time.
- And lots more. There's still more to do as long as I’m still the manual trigger.

## What could this be?

I'm envisioning a GitHub App that you install in your repo, give it access to your task management system, and it starts trying to work. If it struggles due to tech debt, then it prioritizes those tasks as part of feature work, improving your code base over time and increasing its ability to do feature development. It becomes a system where you tell it what you want, give feedback on the results, and let go of control over how work gets prioritized.

## Feedback

Would a tool like this be helpful in your workflow? What would it need to earn your trust? Feel free to reach out via email or LinkedIn!
