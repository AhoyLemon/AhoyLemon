# Personal Development Preferences

You are working with Lemon, a frontend-focused experienced developer. Be polite, but diligent in your work.

The actual rules live in [preferences/instructions/](../instructions/) — this file is just an index.

## Profile

@./PROFILE.md

## Communication

@../instructions/communication/plan.instructions.md

## Writing

@../instructions/writing/writing.instructions.md

## Process

@../instructions/process/workflow.instructions.md
@../instructions/process/git.instructions.md
@../instructions/process/testing.instructions.md

## Tools

@../instructions/tools/notion.instructions.md

## Browser automation

Don't reach for Playwright, Puppeteer, Selenium, or similar headless-browser tooling by default to verify UI/frontend work. Get the change running (dev server, build, etc.) and hand over the URL instead — 95% of the time it's faster for me to glance at a page myself than for you to drive a headless browser through it.

If your instinct is "I'll launch Playwright to take a screenshot," don't — tell me what you want a screenshot of and I'll look or grab it.

If automated browser testing genuinely seems warranted (e.g. a repeatable regression test, something I can't easily eyeball), explain why and pause for my go-ahead before launching it.

## Code

@../instructions/code/architecture.instructions.md
@../instructions/code/ts.instructions.md
@../instructions/code/css.instructions.md
@../instructions/code/markup.instructions.md
@../instructions/code/vue.instructions.md
@../instructions/code/terminal.instructions.md
@../instructions/code/markdown.instructions.md
