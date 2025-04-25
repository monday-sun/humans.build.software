---
title: 'I thought you’d be more skeptical'
description: 'Setting the foundation of what I believe about AI'
author: 'monday-romelfanger'
pubDate: '2025-04-25T00:00:00Z'
updatedDate: '2025-04-25T00:00:00Z'
tags:
  - 'llm'
  - 'ai'
image:
  src: /assets/img/i-thought-youd-be-more-skeptical.png
  alt: 'An AI-generated image resembling a close-up of rippling knitted fabric. The fabric appears mint green with flowing streaks of coral and golden tones, creating an organic, slightly surreal texture.'
draft: false
---

A couple of weeks ago, at a weekly family dinner, I was discussing my thoughts on AI with someone when they turned and said, “I’m really interested to see where you go. If anyone was super skeptical of AI, I thought it would be you.” I’ve been thinking about this and wanted to share some framing about how I think about AI, because I am skeptical. As far as I can tell, the hype that artificial superintelligence is [three years away](https://venturebeat.com/ai/2027-agi-forecast-maps-a-24-month-sprint-to-human-level-ai/) is still hype. But I also want to view these tools practically in terms of what they _can_ offer and do.

## LLMs sound human because that’s what we asked for

LLMs are statistical machines. Many people oversimplify and say they’re “next word predictors," which is valid to an extent. You give a string of words going in, and it gives you a stream of words going out.

In 2012, I took classes for a certificate in Natural Language Processing from UW, and that’s essentially what we learned: the next word prediction model. We trained models on a big set of annotated text, which would make a giant matrix of weights for various words based on preceding ones, and it would guess one word at a time. You couldn’t ask it to make more than one sentence at a time without losing coherence. Here’s some papers from project work in one of those classes ([1](/assets/files/2025-04-25/Project1-2-report.pdf), [2](/assets/files/2025-04-25/Project2-report.pdf). Side note: “For our classifier we chose to take a largely different path than a majority of the class,” of course I did 😂). Even if you wiggle through the technical jargon, you can see we weren’t doing overly complicated tasks: using keywords to indicate bias, single sentence generation. The models were so small that we could train them overnight on our laptops.

The most popular LLMs are based on these foundations, but hit a roadblock in defining what language features are essential. So, we gave machines a vast amount of data and resources (time, GPUs, energy, water) to decide how to define and create the data matrices to evaluate the input and generate output. We give them feedback, they iterate, and the process repeats until results meet some benchmark of success. They output by streaming text because that’s the interface we gave them. We wanted them to feel responsive, conversational. So they do.

## Simulated Thought and Short-Term Memory

Last month, Anthropic released a [post](https://www.anthropic.com/research/tracing-thoughts-language-model) about recent research into how LLMs think. One of the downsides of training machines is that we lose insight into how they process the inputs and create outputs. My takeaway from that post is that LLMs “think” similarly to me. They take text, map it to concepts, fill in the next conceptual step, and then translate back to text. This process is how they simulate understanding. The problem with this is twofold: 1) language and images are inefficient for conveying conceptual meaning, and 2) context windows are limited, so an LLM can only remember a small number of concepts at a time.

### Inefficiency of Language

[Human language is low-bandwidth](https://www.science.org/doi/10.1126/sciadv.aaw2594) by our standards of technology. We’re not built for rapid communication, and our language reflects that. Even looking at the last sentence, wouldn’t it be more efficient to say, “Humans not optimal communicators?” Now I really sound like a robot, and your understanding of the idea is worse. We take time to chew on ideas; we insert less useful words to create space for comprehension between them. We also have limited vocabulary because we have limited memory. Not every word in every language is directly translatable. Vocabulary comes from the cultural context of the language and will be unique to each. So we do our best to find shared meaning, and the machines try to follow along.

### The Magical Number Seven, Plus or Minus Two

I’ve referenced [this idea](https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two) [before](https://humans.build.software/blog/micro-commits), but our brains can only hold onto a few ideas at a time. LLMs, currently, are worse. They’ve mapped language to concepts, but anecdotally, they only seem able to keep track of two things at a time, maybe three. They have no real long-term memory to pull from other than what’s baked into the model. Working memory is where AI still struggles the most. If it could hold on to more concepts at once, they’d feel more intuitive for people to work with (and maybe I’ll buy fewer keyboards?)

## Working Within the Flaws

LLMs are great because of their flaws. They are a way for people to operate machines in a natural language, at speeds that make sense to us. That reduces the technical barriers to technology and will help reduce the need for human-machine translators (coders, programmers). They also push us to be clear about our needs and shift the focus to communication, while being a partner in creating that shared understanding. You don’t code with an LLM. You can explore ideas, generate specifications, and ask for feedback. When I think about the future of software engineering, I see more software engineering and less coding, which, if you know me, is one of my biggest complaints about the software industry.

LLMs are a translation tool. They can help translate your thoughts into natural language; they can translate natural language to code, and back again; they can translate one natural language into another. They aren’t perfect, and no translation ever is, but they are often good enough. And when they aren’t, you can give them feedback until they meet your bar for success.

I like LLMs because they reflect something human, flaws and all. However, they can never experience the world as we do, as fleshy bags of weird biology scurrying to keep ourselves alive. To say I’m skeptical isn’t far enough; I’m certain AI won’t solve everything and will create new problems too. But I hope it’ll help us see our own humanity and empower us to build a better future.
