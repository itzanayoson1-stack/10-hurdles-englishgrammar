# v1.0.1 — Phase-one release

## Changes
- Publish learning access to hurdles 01–03 only. Keep all ten entrance cards and all existing content.
- Block 04–10 even when legacy completion records already unlock them.
- End forward navigation at 03 and offer review of 01 after completion.
- Count published completions out of three, while retaining historical completions for 04–10.
- Key answers by question/options/answer/explanation, not shuffled display position.
- Load level and progress atomically; prevent cross-level storage overwrites.
- Sample quizzes in navigation events, not render/useMemo (which may repeat in StrictMode).
- Make map cards keyboard-operable buttons and actually disable answered quiz options.

## Storage compatibility
New progress uses g10h_v2_<level>. Existing g10h_v1_<level> records remain untouched.
Completion history migrates, including unpublished hurdles. Old positional answers
cannot be mapped safely because the previous question order was never saved; they
remain archived in v1 but are not used for grading. Previously unfinished quizzes
therefore need to be answered again. New answers survive reordering and reload.
This changes runtime progress storage, not the Claude content contract.

## Validation
- Seven Node regression/render tests pass.
- Vite production build passes.
- src/data/hurdles.js is byte-identical to the base commit.
- All 40 hurdle/level combinations have five examples and eight quizzes.
- Browser/mobile interaction verification and Vercel preview status must be checked separately.

## Content issues for coach/Claude (not changed)
- H01 / csat / quiz 4: both 'appears / seems' and 'supports / conducts'
  fit the question asking for verbs of the same kind. Only the former is accepted.
- H01 / csat / quizzes 1 and 4 refer to underlined verbs, but options are rendered
  as plain strings with no underline metadata.
- H02 SentenceAxis and H03 VerbEngine contain additional hardcoded learning
  examples outside hurdles.js. Future content reviews must include these components.

## Remaining
- Coach/Claude review of content issues; no auto-generated replacement examples.
- Resolve color conventions before adding Rough Notation.
- Verify mobile interactions before production approval.
- Merge through PR only; no direct main push.
