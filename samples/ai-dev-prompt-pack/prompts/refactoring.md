# Refactoring prompts

Big-bang rewrites are how AI assistants break working code. These keep changes
safe and reviewable.

---

## 11. Behavior-preserving steps

> Refactor goal: [GOAL, e.g. "extract the payment logic into its own module"].
> Code: [CODE].
> Plan this as a sequence of steps where EVERY step keeps the code fully
> working and each step is independently revertable. No step may change
> behavior. Output the numbered plan first; wait for my go before step 1.

**When to use:** any refactor larger than a rename. The "wait for my go" stops
the model from doing all steps at once badly.

---

## 12. Seam finding

> I need to change [X] but the code is tangled: [CODE].
> Find the seams: the minimal set of places where I can cut and insert an
> interface so [X] becomes swappable without touching the rest. Prefer seams
> that already exist (function boundaries, DI points) over new abstractions.

**When to use:** legacy code, or AI-generated code that grew organically.

---

## 13. Duplication triage

> Here are N similar-looking blocks: [PASTE THEM].
> For each pair, decide: same *knowledge* (must be unified) or same *shape* by
> coincidence (must stay separate). Only propose extraction for same-knowledge
> duplication, and name the concept it represents.

**When to use:** before "DRY-ing" anything. Wrong deduplication is worse than
duplication.

---

## 14. API diet

> Public surface of this module: [PASTE EXPORTS / PUBLIC METHODS].
> Usage sites: [PASTE OR DESCRIBE].
> Propose the smallest public API that still covers all real usage. List each
> removed/merged item with the migration for its callers.

**When to use:** modules that grew a method per bug fix.

---

## 15. Complexity budget

> Rewrite this to be readable by a junior developer in one pass: [CODE].
> Constraints: no clever one-liners, no new abstractions unless they remove
> more concepts than they add, max nesting depth 2, every name says what the
> thing is for. If the logic is irreducibly complex, isolate that part and
> comment WHY it's complex instead of simplifying it wrongly.

**When to use:** the "what does this even do" file, before it gets worse.
