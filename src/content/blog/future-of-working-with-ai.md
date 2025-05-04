---
title: 'The Future of Working with AI — A Human-Centered Collaboration Model'
description: 'AI collaboration that respects human agency and workflow'
author: 'monday-romelfanger'
pubDate: '2025-05-04T00:00:00Z'
updatedDate: '2024-05-04T00:00:00Z'
tags:
  - 'ai-collaboration'
  - 'human-centered-design'
  - 'workflow'
  - 'collaboration'
  - 'artifacts'
image:
  src: /assets/img/future-of-working-with-ai.png
  alt: 'A human and a translucent, glowing AI figure sit across from each other at a warm wooden workbench. The human is sketching with a pen on a piece of paper, while the AI interacts with a holographic code editor and CAD blueprint. Between them are scattered collaborative materials—handwritten notes, code printouts, colorful fabric swatches, and a machined part—symbolizing a shared creative process.'
draft: false
---

## The Friction of Current AI Tools

At the start of 2025, I worked as a software engineer at a tiny AI data analytics startup. I was fighting with AI on two fronts: how to provide valuable features for our customers and how to use AI tools for my work. Both somehow seemed intractable. Our customers weren't valuing the insights we were generating; I was introducing all kinds of defects I would have caught before relying on AI tools.

I left that company in February and spent the next few months deep-diving into understanding what was going wrong. For myself, I adopted a no-code-writing rule and worked on several projects. I talked with people across various disciplines, such as Devs, PM, marketing, and DevOps, about how they use AI tools and where they feel frustrated.

Along the way, I found some common themes: people feel less engaged and in control of their work when using standard LLM-based tools. Some people are learning how to work around this, others are either avoiding them altogether or using them minimally. That pattern is not the path to realizing the full potential of AI for work.

## Pillars for AI-Human Interaction

Reflecting on the conversations, my own experience, and research around human collaboration, I've developed these five pillars:

### Human‑First Purpose

Every feature starts with a concrete human need and ends with greater human agency. AI success is measured by how well it amplifies people, not how many tokens it generates or how long it works without human intervention.

### Native to Human Communication

Humans think and collaborate through language, persistent artifacts, and iterative feedback. AI must operate in those same channels—clear text, editable docs, code diffs, sketches—and stay conversational rather than opaque.

### Workflow Respect & Augmentation

Human workflow loops, like brainstorm → draft → review → ship, remain intact. AI plugs into each stage to accelerate or lighten the load; it never jumps or removes a step humans rely on for shared understanding. Even as these workflows evolve and AI takes on more work, they need to optimize for sharing intent.

### Granular, Trust‑First Collaboration

Like a good teammate, AI delivers work in small, reviewable chunks, carries forward the shared project memory, and adapts quickly to human feedback. Total transparency isn't required—legible, context‑aware interaction is.

### Feedback‑Ready by Design

Every interaction offers a low‑friction path for humans to correct, refine, or redirect the AI, turning each cycle into a learning moment for both sides and preventing silent drift from intent.

These pillars aren't speculative; they're already emerging in how thoughtful teams and builders work with AI today. These pillars hold regardless of how agentic AI becomes. The future of AI at work isn't purely agentic or autonomous; it's **collaborative, contextual, and conversational**. That's the path to real amplification, not just automation.

### A Vision for the Future

Based on these pillars, I envision a collaborative AI future. Some ways this might look:

#### Artifacts as Memory

If it's not written down, it's forgotten. If it's not human-readable, it's not shared memory. LLMs must use artifacts rather than using opaque, internally generated memory structures. We write things down in documents, code, comments, and plans. _Those_ are the artifacts that humans already trust because they convey information in a format and pace that's legible to humans. It also gives users the tools to communicate the source of the information.

Using documents and other artifacts as memory gives users a way to:

- Inspect and adjust what the AI "remembers"
- Trace why the agent took an action, or discover missing directives
- Update or correct the AI's understanding without having to engineer a perfect prompt.

We see the start of this already with various types of RAG tools: ChatGPT doing web searches, Cursor doing searches within a codebase. Still, we lack tools that explicitly drive toward creating artifacts as a collaborative exercise in building shared context and assisting users in adjusting those artifacts to meet their needs.

#### Feedback-Driven Workflows

We don't need AI to replace our processes; we need it to **participate in them**. We design our processes to produce a series of artifacts that help specify and solve the target problem. Each artifact is a point where stakeholders and contributors can give feedback to ensure we maintain a path to the desired outcome.

Let's look at some example workflows across multiple domains:

##### Software Engineering

Workflow: Spec → Code → PR → Review → Merge → Changelog

Artifacts:

- Feature specs (markdown, tickets)
- Code diffs
- Pull requests with review threads
- CI logs, test results
- Final changelog or release note

Each step produces reviewable, structured outputs. AI can draft, refine, test, and comment, but developers can also participate in the review process to maintain context and orient the work to meet their needs.

##### Hardware Product Manufacturing

Workflow: CAD Design → 3D-Printed Prototype → Tooling → Test Run → QA Feedback → Mass Production

Artifacts:

- 3D-printed prototype (early physical test of form/function)
- Injection mold or custom jig (tooling as a reusable artifact)
- Small batch from test run
- QA reports (digital, but based on physical inspection)

Every phase produces **something you can hold, test, or measure**, and each artifact invites feedback before committing resources. A prototype might reveal ergonomic flaws. A test run might uncover material warping.

##### Technical Documentation

Workflow: Outline → Draft → Review → Publish → Update

Artifacts:

- Doc outline
- Drafts with comments
- Final published documentation
- Change tracking/reasoning

Feedback happens at multiple fidelity levels. AI can co-author, but clarity and accuracy come through human collaboration.

While these workflows are common, the way each person navigates them is deeply individual. Some people will want more iterations of feedback, and some will care about specific artifacts while disregarding others. Individuals and teams need to be able to express what they want from the process, have the AI help design that process, accept feedback from multiple human collaborators throughout, and adjust the process as needed.

#### Curated AI Personas and Multi-AI Collaboration

An AI that knows what I know can act as a stand-in for my experience and perspective. Individuals working alongside AI assistants build a knowledge base representing their collective experience and perspective—an expert diagnostician, developer, or civil rights activist. An AI agent can then participate in other workflows and act on their behalf to make expertise more accessible.

As each person develops and evolves their persona, they can contribute meaningfully to more conversations that they otherwise wouldn't have the bandwidth to participate in. AI personas can be especially helpful in ensuring diverse perspectives are available when garnering feedback. Multiple AI perspectives can converse and seek input from their human counterparts to develop the best solutions for the problems we're working to solve.

## A Future Worth Collaborating On

Work aims to provide humans with what they need to survive and thrive. AI has the potential to unlock new types of creativity in problem solving, increase productivity, and scale perspectives, but AI can't replace lived human experience. People still experience the world through their bodies, with internal lives and needs that no model can fully replicate. This human-centered collaboration model strives to respect those needs and shape a future where AI boosts humanity instead of hindering it.
