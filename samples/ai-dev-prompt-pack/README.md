# AI Dev Prompt Pack

25 battle-tested prompts for shipping software with AI assistants (Claude,
Cursor, Copilot Chat, anything chat-based). Not "act as a senior developer"
fluff — each prompt has a fill-in structure and a note on *when* it beats the
naive alternative.

## What's inside
- `prompts/spec-first.md` — turn a vague idea into a buildable spec before any code
- `prompts/debugging.md` — isolate bugs faster than "why doesn't this work"
- `prompts/refactoring.md` — safe, incremental restructuring with guardrails
- `prompts/code-review.md` — make the model an adversarial reviewer of its own code
- `prompts/testing.md` — get tests that catch bugs, not tests that pass

## How to use
Copy a prompt, replace the `[BRACKETS]`, paste into your assistant. Prompts are
written to be model-agnostic. Where it matters, there's a note on trimming for
smaller context windows.

## The one rule that makes all of these work
Give the model a **role in a workflow, not a personality**. Every prompt here
follows the same skeleton: context → constraint → task → output format. Steal
the skeleton for your own prompts.
