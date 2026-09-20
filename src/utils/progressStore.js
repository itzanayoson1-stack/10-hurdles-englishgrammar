import { HURDLES, LEVELS } from '../data/hurdles.js'
export const LEVEL_KEY = 'g10h_level'
const validLevel = level => LEVELS.some(item => item.id === level)
const stateKey = level => `g10h_v2_${level}`
const empty = () => ({ cleared: [], quizAnswers: {} })
// Preserve question identity across shuffles; changed content gets a new identity.
export const quizKey = quiz => JSON.stringify([quiz.q, quiz.opts, quiz.answer, quiz.exp])
export function loadLevel(storage) {
  try {
    const level = storage.getItem(LEVEL_KEY)
    return validLevel(level) ? level : null
  } catch { return null }
}
function normalize(value, level) {
  const result = empty()
  if (!value || typeof value !== 'object') return result
  result.cleared = [...new Set(Array.isArray(value.cleared) ? value.cleared : [])]
    .filter(id => HURDLES.some(h => h.id === id))
  for (const h of HURDLES) {
    const stored = value.quizAnswers?.[h.id]
    if (!stored || typeof stored !== 'object') continue
    const answers = {}
    for (const q of h.levels[level].quizzes) {
      const key = quizKey(q)
      const answer = stored[key]
      if (Number.isInteger(answer) && answer >= 0 && answer < q.opts.length) answers[key] = answer
    }
    result.quizAnswers[h.id] = answers
  }
  return result
}
export function loadProgress(storage, level) {
  if (!validLevel(level)) return empty()
  try {
    const raw = storage.getItem(stateKey(level))
    if (raw !== null) return normalize(JSON.parse(raw), level)
    const legacy = JSON.parse(storage.getItem(`g10h_v1_${level}`) || 'null')
    // Legacy answers lack question identities. Preserve v1 unchanged and migrate
    // only completion history; never attach a positional answer to a new question.
    return normalize({ cleared: legacy?.cleared }, level)
  } catch { return empty() }
}
export function saveProgress(storage, level, state) {
  if (!validLevel(level)) return
  try { storage.setItem(stateKey(level), JSON.stringify(state)) } catch { /* Memory-only mode. */ }
}
export function loadSession(storage, level = loadLevel(storage)) {
  return { level: validLevel(level) ? level : null, state: loadProgress(storage, level) }
}
export function recordAnswer(state, hurdleId, key, answer) {
  return { ...state, quizAnswers: { ...state.quizAnswers,
    [hurdleId]: { ...state.quizAnswers[hurdleId], [key]: answer } } }
}
