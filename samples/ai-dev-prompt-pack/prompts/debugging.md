# Debugging prompts

"Why doesn't this work" gets you guesses. These get you diagnosis.

---

## 6. Structured bug report (to the model)

> Bug: [WHAT HAPPENS] instead of [WHAT SHOULD HAPPEN].
> Repro: [STEPS].
> Code: [PASTE THE RELEVANT UNIT — not the whole file].
> Error/output: [PASTE EXACTLY, don't paraphrase].
> List the 3 most likely root causes ranked by probability. For each: what
> evidence in the paste supports it, and the single cheapest check to
> confirm/eliminate it. Don't propose fixes yet.

**When to use:** always, instead of pasting a wall of code with "fix this".
Separating diagnosis from fixing stops the model from confidently patching the
wrong thing.

---

## 7. Differential debugging

> This worked: [OLD CODE / COMMIT / STATE].
> This doesn't: [NEW CODE / STATE].
> The only intended change was: [CHANGE].
> Diff the behavior, not the text: list every *behavioral* difference between
> the two versions, then identify which one explains the bug.

**When to use:** "it worked yesterday" bugs.

---

## 8. Assumption audit

> Here's the failing code: [CODE].
> List every assumption this code makes to work correctly (inputs, environment,
> timing, state, external services). Mark each: verified in the code / unverified.
> The bug is usually an unverified assumption — which one would you check first?

**When to use:** heisenbugs and "impossible" states.

---

## 9. Rubber-duck reversal

> I'll explain what this code does line by line: [YOUR EXPLANATION].
> Here's the actual code: [CODE].
> Find every place where my explanation and the code disagree — that mismatch
> is where my mental model is wrong.

**When to use:** when you've stared at it too long. Painfully effective.

---

## 10. Log placement

> Bug: [SYMPTOM]. Code path: [CODE].
> I can add at most 5 log lines before re-running. Place them for maximum
> information gain — each log should cut the remaining search space roughly in
> half. Output: exact lines to add and what each result would tell us.

**When to use:** slow feedback loops (deploys, long jobs, prod-only bugs).
