import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { HURDLES } from '../src/data/hurdles.js'
import { quizKey } from '../src/utils/progressStore.js'
import { canOpen } from '../src/config/release.js'
test('rendered cards, completion text and answers respect phase-one scope', async () => {
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  try {
    const { default: Map } = await server.ssrLoadModule('/src/components/HurdleMap.jsx')
    const html = renderToStaticMarkup(React.createElement(Map, {
      hurdles: HURDLES, selectedId: null, isCleared: () => true,
      isUnlocked: id => canOpen(id, [1,2,3,4,5,6,7,8,9,10]), onSelect: () => {},
    }))
    assert.equal((html.match(/data-hurdle=/g) || []).length, 10)
    assert.equal((html.match(/disabled=""/g) || []).length, 7)
    assert.ok(html.includes('준비 중'))
    const { default: Quiz } = await server.ssrLoadModule('/src/components/QuizBox.jsx')
    const [a, b] = HURDLES[2].levels.ms.quizzes
    const quiz = renderToStaticMarkup(React.createElement(Quiz, {
      hurdle: { id: 3, quizzes: [b, a] }, answers: { [quizKey(a)]: a.answer },
      onAnswer: () => {}, onClear: () => {}, isCleared: true,
    }))
    assert.equal((quiz.match(/disabled=""/g) || []).length, 3)
    assert.ok(!quiz.includes('다음 허들이 열렸습니다.'))
    assert.ok(quiz.includes('공개된 허들을 모두 완료'))
  } finally { await server.close() }
})

test('hurdle one shows a short explanation with the full lesson in a dialog', async () => {
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  try {
    const { default: Detail } = await server.ssrLoadModule('/src/components/HurdleDetail.jsx')
    const h = HURDLES[0]
    const html = renderToStaticMarkup(React.createElement(Detail, {
      hurdle: { ...h, examples: h.levels.ms.examples, summary: h.levels.ms.summary, quizzes: h.levels.ms.quizzes },
      isCleared: false, quizAnswers: {}, onAnswer: () => {}, onClear: () => {},
    }))
    assert.ok(html.includes('A를 잡고, 가운데 동사를 보세요'))
    assert.ok(html.includes('설명 전체 보기'))
    assert.ok(html.includes('aria-labelledby="hurdle-one-theory-title"'))
    assert.ok(html.includes('The door at the end of the hall'))
    assert.ok(html.includes('The guard opens the door'))
  } finally { await server.close() }
})
