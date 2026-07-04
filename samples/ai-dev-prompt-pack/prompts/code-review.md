# Code-review prompts

Models are agreeable by default — they'll praise broken code. These force an
adversarial stance.

---

## 16. Adversarial review

> Review this diff as a reviewer whose bonus depends on finding real bugs:
> [DIFF/CODE].
> Rules: only report issues that cause wrong behavior, data loss, or security
> holes — no style notes. For each finding: the exact failure scenario (inputs →
> wrong outcome), severity, and the minimal fix. If you find nothing, say
> "no functional issues found" — do not invent nitpicks to seem useful.

**When to use:** every AI-generated change before you commit it. The "do not
invent nitpicks" line is what makes the output signal instead of noise.

---

## 17. Security pass

> Same code: [CODE].
> Threat-model it: who can reach this code path and with what inputs? Check
> specifically: injection (SQL/command/path), authz (is the *owner* check where
> the *auth* check is?), secrets in logs/errors, unvalidated redirects, race
> conditions on money/state. Report only exploitable findings with the attack.

**When to use:** anything touching auth, money, files, or user input.

---

## 18. Edge-case enumeration

> Function: [CODE].
> Enumerate the input space by category: empty, boundary (0, 1, max, max+1),
> malformed, unicode/encoding, concurrent calls, huge. For each category, state
> what the code currently does — read it, don't guess — and whether that's right.

**When to use:** parsers, money math, anything with pagination or dates.

---

## 19. Reviewer disagreement

> Two positions on this code: [PASTE CODE + THE DEBATE OR YOUR DOUBT].
> Argue position A as its strongest advocate (3 points), then position B
> (3 points), then rule: which wins for THIS codebase given [CONTEXT:
> team size, lifespan, perf needs]. Commit to one answer.

**When to use:** when you're rationalizing. The forced ruling beats "it depends".

---

## 20. Post-merge audit

> Here's what shipped this week: [DIFFS / SUMMARY].
> List: (1) any behavior changes not mentioned in the commit messages,
> (2) new dependencies and what they drag in, (3) places where two changes
> might interact badly. This is an audit, not a review — assume everything
> individually passed review already.

**When to use:** weekly, on fast-moving AI-assisted codebases. Catches drift.
