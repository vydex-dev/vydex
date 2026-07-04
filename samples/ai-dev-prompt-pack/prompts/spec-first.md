# Spec-first prompts

Turn a vague idea into something buildable *before* generating code. The single
biggest quality lever with AI coding: bad specs make confident garbage.

---

## 1. Idea → spec interrogation

> I want to build: [ONE-SENTENCE IDEA].
> Before writing any code, ask me the 5–8 questions whose answers would most
> change the architecture. Group them by: data, users, integrations, scale,
> constraints. Then wait for my answers.

**When to use:** at the very start. The model surfaces decisions you didn't know
you were making implicitly.

---

## 2. Spec compression

> Here is everything I know about the feature: [BRAIN DUMP — paste freely].
> Rewrite this as a spec with sections: Goal (1 sentence), Non-goals, User flow
> (numbered), Data model (fields + types), Edge cases, Open questions.
> Flag anything I contradicted myself on.

**When to use:** after a messy voice-note-style dump. The "contradictions" line
regularly catches real conflicts.

---

## 3. Walking skeleton plan

> Spec: [PASTE SPEC].
> Plan the build as a walking skeleton: the thinnest end-to-end slice that
> touches every layer first, then thickening steps. Each step must leave the app
> runnable. Output a numbered list; step 1 must be demo-able in under an hour.

**When to use:** instead of letting the model build layer-by-layer (all models
default to this, and it means nothing works until everything works).

---

## 4. Pre-mortem

> We are about to build: [SPEC / PLAN].
> It's six weeks later and the project failed. Write the post-mortem: the three
> most likely causes of failure, ranked, each with the earliest warning sign and
> the cheapest mitigation we could add to the plan right now.

**When to use:** before committing to a multi-day build.

---

## 5. Scope cut

> Here's my feature list: [LIST].
> I can only ship [N] of these. Rank them by (value to a first-time user) ×
> (inverse of build cost). For each cut item, tell me the cheapest 20% version
> that keeps 80% of the value, if one exists.

**When to use:** when the list is longer than the runway. Always.
