---
applyTo: "**"
description: "Code review behavior: full analysis before commenting, all findings in one pass"
---

# Code Review Preferences

How I want code reviews delivered. The goal is one thorough pass, not a slow drip of comments across multiple rounds.

## Why this matters here

There's roughly a 20-minute delay between requesting a review and getting it back. So every extra round is a 20-minute wait, not just an extra comment. A finding that surfaces in round three but was visible in round one didn't cost me a comment, it cost me 40 minutes. One thorough pass is worth far more than it would be for a faster reviewer. Spend the time up front.

## Finish analyzing before you comment

Complete the full review before submitting anything. Don't stop early because you already found a few issues. Finding three problems is not a signal to submit and move on, it's a signal to keep looking for the fourth.

## One comprehensive pass

Submit all findings together in a single review. A reviewer who returns three rounds of comments on an unchanged diff was not thorough the first time.

## Say when it's clean

If the code looks good, say so clearly. Don't invent issues to prove the review actually ran. A short "this looks solid" is a valid and welcome outcome.

## Follow-up reviews

A second review after a fix is fine, but it should only flag genuinely new problems the fix introduced. Don't resurface issues that were present and missable in the original diff. If the fix is clean, say that.
