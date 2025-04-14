---
title: 'Monday’s Weekly Notes: April 14, 2025'
description: “Fast and Furious”
author: Monday Romelfanger
categories: weekly-notes
tags:
  - weekly-notes
  - llms
  - development-process
  - cursor
  - build-in-public
last_modified_at: '2025-04-14T09:00'
---
_Weekly Notes are to help inspirie others experimenting right now, provide a framework for me to reflect, and discuss these workflows with others._

## Highlights

- Quilt made major strides this week: the modular actor system clicked, SQLite persistence landed, and the first full path through the cutting and swatching pipeline works.
- Started writing as a companion to the dev work — two blog posts published, the reflection is helpful
- The Cursor workflow is starting to prove itself, even if it’s still rough around the edges.
- LLM-based workflows are fast but cognitively dense — I’m moving quickly, but it feels like carrying a lot at once.

---

## In-Progress / Work Notes

- Built and integrated Quilt’s actor system:
  - The actor model was suggested by an LLM but made real when I connected it to how I already think — code as cooperating systems.
  - Formalizing this helped break the work into intuitive, modular pieces.

- Connected key components:
  - Discovery actor ↔ scanner + material registry
  - Cutting actor ↔ persistence backend
  - SQLite integrated for early persistence
  - Laid groundwork for swatching infrastructure

- Cursor code review caught real issues:
  - Missing error reporting if Cut persistence failed
  - Architectural gaps in dealing with backpressure

- Tooling insights:
  - Plan → Act → Plan loop is effective at keeping the Cursor Agent from running away
  - Memory bank too rigid for evolving work, not team-friendly yet
  - Local review flow works but not yet integrated with GitHub

- Considering GitHub MCP Server for bridging GitHub reviews with Cursor + LLM context

---

## Thinking & Reflection

- For Quilt, Contextual “spreads” are still a conceptual knot:
  - The metaphor is solid, but implementation will need trial and error
- Starting to see my work as cyclical: build → reflect → teach
- Even with good velocity, I feel behind in documentation and reflection. Hopefully these weekly notes will help figure out what's important to say.

---

## Cursor Rules

These are my current Cursor rules. I can feed it commands to facilitate a largely automated workflow: `what's next`, `do you have any questions`, `act`, `test`, `code review`, then `update memory bank`, and it follows these rules to respond with consistent structure and behavior. As long at I have a clear implementation plan in place, this works farily smoothly. If it fails, then we update the implementation plan with more detail / learnings from the attempt.

- 📄 [`implementation_planning.mdc`](/assets/files/2025-04-14/implementation_planning.mdc)  
  This powers commands like `plan this feature` or `what's next`. It guides Cursor to produce milestone-driven, end-user-focused implementation plans with learning goals and time estimates.  
  It reinforces incrementalism and discourages diving straight into code.  
  **Pros:** Keeps the LLM from jumping ahead. Forces it to model intent before execution. Helps me think too.  
  **Cons:** My implementation plan doc is a giant backlog. I really wish I had a nicer task tracking tool to use here. This is another thing I want to try the Github mcp for.

- 📄 [`modes_of_operation.mdc`](/assets/files/2025-04-14/modes_of_operation.mdc)  
  This governs the Cursor event loop. It starts in PLAN mode and doesn’t switch to ACT until I explicitly tell it to `ACT`. Every response starts with `# Mode: PLAN` or `# Mode: ACT` so I know what state it's in.
  **Pros:** Helps prevent the LLM from just going. Claude in Cursor is very eager to please with completed work. Helps the LLM frame the work before executing. Gemini is much better at planning and following the memory bank rules. Claude is better at acting because it's fine tuned to the tools.
  **Cons:** Claude is not very good at sticking to these rules anyway, and it's less fluid and 'natural' feeling.
  **Source:** [reddit post](https://www.reddit.com/r/cursor/comments/1jqvqjx/thanks_to_the_memory_system_post_productivity/)


- 📄 [`memory_bank.mdc`](/assets/files/2025-04-14/memory_bank.mdc)  
  This defines how Cursor treats memory. It assumes total amnesia between sessions and reads the memory bank files on every task. The structure is layered — project briefs, system patterns, current focus — and acts as the persistent state for the project.  
  Cursor reads from this when initializing, and I can trigger updates with `update memory bank`.  
  **Pros:** Gives Cursor continuity. I don’t have to restate context every time. Especially powerful for long-form or paused work.  
  **Cons:** Not ideal for teams and it's weird to maintain docs just for the LLM to use.
  **Source:** [reddit post](https://www.reddit.com/r/cursor/comments/1jqvqjx/thanks_to_the_memory_system_post_productivity/)

- 📄 [`code_review.mdc`](/assets/files/2025-04-14/code_review.mdc)  
  When I type `code review`, Cursor kicks off a structured review using this doc. It automatically diffs against `main`, scopes the changes, and walks through architecture, error handling, async, test coverage, performance, naming, and Rust-specific concerns.  
  It also checks that the memory bank and `@implementation-plan.md` are up to date.  
  **Pros:** Catches bugs and gaps with zero prompting. I can trust the review will be thorough without micromanaging it.  
  **Cons:** I wish I could do this on Github and transfer the feedback back to my local cursor session.

---

**Overall Use Case:**  
These rules make Cursor act like a junior dev or co-pilot with strong instincts and a short memory. I drive the flow by giving high-level commands, and it uses the rule set to respond consistently — whether I’m asking for a review, a next step, or a rewrite.

**Biggest Wins:**  
- I don’t need to remember what to ask — I just say what I need (`code review`, `plan`, `test`, etc.) and Cursor knows what to do.
- The structure helps me scale — I can pause work, come back, and pick up from where the memory left off.
- It feels less like prompting, more like pairing with a teammate.

**Biggest Gaps:**  
- Missing integration with other tools
- Not good for team environments. Maybe memory-bank could be git ignored and unique to the project/individual? Is it necessary with otherwise good documentation?

---

**Overall Pros:**
- They reduce cognitive load and bring structure to async LLM dev work.
- They're a long-term bet on trustable rituals — I can feel the system getting sharper.

**Overall Cons:**
- Still not integrated into GitHub or fully LLM-aware — lots of manual context syncing.
- Too rigid in places (memory bank) and too reliant on me remembering to invoke them.
- They need tooling, or at least automation hooks, to scale or share effectively.

---

## Links & Publishing

- 📝 Blog posts:
  - [What the heck am I supposed to be doing?](https://humans.build.software/posts/what-the-heck-am-I-supposed-to-be-doing/)
  - [Transcript: Vibe Conding a Crystal Ball](https://humans.build.software/posts/z-crystal-ball/)

- 🌐 Site migration:
  - Moved blog to [humans.build.software](https://humans.build.software)
  - Redirect from GitHub Pages still pending

- 🎓 Teaching idea emerging:
  - Thinking about running a class on LLM workflows — from philosophy to rituals

- 🔍 Exploring:
  - [Claude Task Master](https://github.com/eyaltoledano/claude-task-master)
  - [GitHub MCP Server](https://github.com/github/github-mcp-server)

---

## Life & Grounding

- Playing *Spiritfarer*. It’s steady, gentle, and hitting the right rhythm.
- Mid-day Monday is a lovely time for grocery shopping. It's nice to feel free of the corporate schedule.

---

## 🐈 Cat Pic of the Week

<img src="/assets/files/2025-04-14/cat-pic.jpeg" alt="An orange tabby cat sits on a high white ledge near the ceiling, looking down. The background includes a wooden ceiling and a blue wall below." style="max-width: 400px; height: auto; border-radius: 8px;" />

---

## Meta & Cadence

- This review is more like a week and a half, but it's all good stuff.
- Working on a post about overall thoughts on an LLM-based workflow
- First weekly notes!!
- For non-cursor LLM chats if you're having markdown rendering problems:
  > “Please produce a Markdown document that is entirely wrapped in a single code block with outer backticks (using four backticks for the outer fence) so that inner formatting is preserved.”

---

## 💬 Open Threads

Curious how others are shaping their LLM workflows. Are you trying something similar with Cursor or memory-based systems?

This week I’m especially thinking about:
- How to make memory banks more team-friendly
- Integrating LLM review flows with GitHub

If you’re experimenting in this space, I’d love to hear what’s working (or not).
