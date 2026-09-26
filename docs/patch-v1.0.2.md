# v1.0.2 — Gate Dash practice game

## Changes
- Add the agreed Gate Dash game to published hurdles 01–03 at every level, using the quizzes already selected for that visit.
- Hide the first question until Start. Let three doors descend together, then move toward the player; selecting one freezes the wall and immediately shows the result and original explanation.
- Advance automatically after a correct answer; after an incorrect answer, offer Next sentence, which starts the next round without another Start or Go step.
- Show a compact score, streak reward, heart indicator and an optional prior explanation panel that pauses the wall while open.
- Keep the original QuizBox available under “기존 퀴즈 · 허들 완료”; its existing answers and hurdle completion mechanism remain intact. Game points do not affect saved quiz progress.

## Content and scope
- No edits to `src/data/hurdles.js` or the existing QuizBox. Hurdles 04–10 remain unavailable.
- Hurdle questions, three options, answer index and explanations are consumed directly from the existing data; the game does not generate new sentences.

## Validation
- `npm test` and `npm run build` to be run before merge.
- Check the game flow on a real browser and the Vercel deployment separately.
