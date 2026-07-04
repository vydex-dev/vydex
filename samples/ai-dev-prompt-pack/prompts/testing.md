# Testing prompts

Naive "write tests for this" produces tests that mirror the implementation —
they pass forever and catch nothing. These don't.

---

## 21. Spec-derived tests

> Spec (NOT the code): [WHAT THE FUNCTION SHOULD DO].
> Write the test suite from this spec alone. Then I'll paste the
> implementation — do not ask for it. Tests must cover: the happy path, each
> stated edge case, and one property that must hold for any valid input.

**When to use:** always, when the code already exists. Writing tests from the
spec (not the code) is the whole trick — mismatches ARE the bugs.

---

## 22. Bug-hunting tests

> Implementation: [CODE].
> Write 5 tests specifically designed to FAIL. Target: boundaries, unexpected
> types, ordering, state left over from a previous call, concurrent use.
> For each test, say what bug it would catch. I expect at least one to fail.

**When to use:** after the polite test suite is green.

---

## 23. Regression pin

> This bug just happened: [DESCRIPTION + THE FIX DIFF].
> Write ONE test that: fails on the pre-fix code, passes on the post-fix code,
> and is named after the behavior (not the ticket number). Minimal setup — if
> the test needs 30 lines of mocks, tell me what seam is missing instead.

**When to use:** every bug fix. The "tell me what seam is missing" part
regularly exposes design problems.

---

## 24. Test triage

> Test suite: [PASTE TESTS OR LIST NAMES].
> Classify each test: (A) catches real regressions, (B) tests the mock/framework
> not our code, (C) duplicate coverage of another test, (D) so coupled to
> implementation it breaks on every refactor. Recommend: keep / rewrite / delete.
> Deleting bad tests is a valid outcome.

**When to use:** inherited or AI-generated suites with suspicious 100% pass rates.

---

## 25. Coverage honesty

> Code: [CODE]. Tests: [TESTS].
> Ignore line coverage. What BEHAVIORS are untested? List each untested
> behavior with the input that would exercise it and the wrong output that
> would currently go unnoticed. Rank by (likelihood × damage).

**When to use:** when the coverage number looks good and you don't believe it.
