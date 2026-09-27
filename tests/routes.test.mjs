import test from 'node:test'
import assert from 'node:assert/strict'
import { hurdleIdFromPath, hurdlePath } from '../src/utils/hurdleRoute.js'

test('published hurdle pages have stable direct links', () => {
  for (const id of [1, 2, 3]) {
    assert.equal(hurdleIdFromPath(hurdlePath(id)), id)
    assert.equal(hurdleIdFromPath(`${hurdlePath(id)}/`), id)
  }
  assert.equal(hurdleIdFromPath('/'), null)
  assert.equal(hurdleIdFromPath('/hurdles/1/game'), null)
})
