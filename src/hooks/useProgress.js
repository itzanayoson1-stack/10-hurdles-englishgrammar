import { useState, useEffect } from 'react'
import { LEVEL_KEY, loadSession, saveProgress, recordAnswer } from '../utils/progressStore'
import { canOpen, isPublished } from '../config/release'
function storage() {
  try { return window.localStorage } catch { return null }
}
export function useProgress() {
  const [session, setSession] = useState(() => loadSession(storage()))
  const { level, state } = session
  // Store level and progress atomically to prevent cross-level writes.
  useEffect(() => { saveProgress(storage(), level, state) }, [level, state])
  function setLevel(newLevel) {
    const next = loadSession(storage(), newLevel)
    if (!next.level) return
    saveProgress(storage(), level, state)
    try { storage()?.setItem(LEVEL_KEY, next.level) } catch { /* Memory-only mode. */ }
    setSession(next)
  }
  function resetLevel() {
    saveProgress(storage(), level, state)
    try { storage()?.removeItem(LEVEL_KEY) } catch { /* Memory-only mode. */ }
    setSession({ level: null, state: { cleared: [], quizAnswers: {} } })
  }
  const isCleared = id => state.cleared.includes(id)
  const isUnlocked = id => canOpen(id, state.cleared)
  function clearHurdle(id) {
    setSession(prev => {
      if (!canOpen(id, prev.state.cleared)) return prev
      return { ...prev, state: { ...prev.state,
        cleared: [...new Set([...prev.state.cleared, id])] } }
    })
  }
  const getQuizAnswers = id => state.quizAnswers[id] || {}
  function answerQuiz(id, key, answer) {
    setSession(prev => canOpen(id, prev.state.cleared)
      ? { ...prev, state: recordAnswer(prev.state, id, key, answer) } : prev)
  }
  const resetAll = () => setSession(prev => ({ ...prev, state: { cleared: [], quizAnswers: {} } }))
  return { level, setLevel, resetLevel, isCleared, isUnlocked, clearHurdle,
    getQuizAnswers, answerQuiz, resetAll,
    totalCleared: state.cleared.filter(isPublished).length }
}
