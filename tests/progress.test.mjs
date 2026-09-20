import test from 'node:test'
import assert from 'node:assert/strict'
import { HURDLES, LEVELS } from '../src/data/hurdles.js'
import { quizKey, loadProgress, loadSession, saveProgress, recordAnswer } from '../src/utils/progressStore.js'
import { canOpen, nextPublished } from '../src/config/release.js'
const memory = () => {
  const values = new Map()
  return { getItem: k => values.get(k) ?? null, setItem: (k, v) => values.set(k, v) }
}
test('answers follow question identity after reorder and reload', () => {
  const storage = memory()
  const [a, b] = HURDLES[0].levels.ms.quizzes
  const state = recordAnswer(loadProgress(storage, 'ms'), 1, quizKey(a), a.answer)
  saveProgress(storage, 'ms', state)
  const saved = loadProgress(storage, 'ms').quizAnswers[1]
  assert.equal(saved[quizKey(b)], undefined)
  assert.equal(saved[quizKey(a)], a.answer)
  assert.notEqual(quizKey(a), quizKey({ ...a, opts: [...a.opts].reverse() }))
})
test('legacy completion including unpublished hurdles survives, positional answers stay archived', () => {
  const storage = memory()
  const raw = JSON.stringify({ cleared: [1, 2, 3, 4, 10], quizAnswers: { 1: { 0: 2 } } })
  storage.setItem('g10h_v1_ms', raw)
  const next = loadProgress(storage, 'ms')
  assert.deepEqual(next.cleared, [1, 2, 3, 4, 10])
  assert.deepEqual(next.quizAnswers, {})
  saveProgress(storage, 'ms', next)
  assert.equal(storage.getItem('g10h_v1_ms'), raw)
})
test('level round trips keep each level isolated', () => {
  const storage = memory()
  for (const [i, level] of LEVELS.entries()) {
    saveProgress(storage, level.id, { cleared: [i + 1], quizAnswers: {} })
  }
  for (const [i, level] of [...LEVELS.entries()].reverse()) {
    const session = loadSession(storage, level.id)
    assert.equal(session.level, level.id)
    assert.deepEqual(session.state.cleared, [i + 1])
    saveProgress(storage, session.level, session.state)
  }
})
test('invalid storage and invalid level recover without crashing', () => {
  const storage = memory()
  storage.setItem('g10h_level', 'invalid')
  storage.setItem('g10h_v2_ms', '{bad')
  assert.equal(loadSession(storage).level, null)
  assert.deepEqual(loadProgress(storage, 'ms').cleared, [])
  assert.equal(loadSession(null).level, null)
  assert.doesNotThrow(() => saveProgress(null, 'ms', {}))
})
test('published navigation ends at 3 even for legacy complete users', () => {
  assert.equal(canOpen(1, []), true)
  assert.equal(canOpen(2, []), false)
  assert.equal(canOpen(2, [1]), true)
  assert.equal(nextPublished(2), 3)
  assert.equal(nextPublished(3), null)
  for (let id = 4; id <= 10; id++) assert.equal(canOpen(id, [1,2,3,4,5,6,7,8,9,10]), false)
})
test('all current content has valid structure and unambiguous storage identities', () => {
  assert.equal(new Set(HURDLES.map(h => h.id)).size, 10)
  for (const h of HURDLES) for (const { id } of LEVELS) {
    const { quizzes, examples } = h.levels[id]
    assert.equal(examples.length, 5)
    assert.equal(quizzes.length, 8)
    assert.equal(new Set(quizzes.map(quizKey)).size, quizzes.length)
    for (const q of quizzes) {
      assert.equal(q.opts.length, 3)
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 3)
      assert.ok(q.q && q.exp)
    }
    for (const e of examples) assert.ok(e.en && e.ko)
  }
})
