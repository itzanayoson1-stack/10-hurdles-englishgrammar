import { useState, useEffect } from 'react'

const STORAGE_KEY = 'g10h_v1'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {}
  return { cleared: [], quizAnswers: {} }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {}
}

export function useProgress() {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const isCleared = (id) => state.cleared.includes(id)
  const isUnlocked = (id) => id === 1 || state.cleared.includes(id - 1)
  const clearHurdle = (id) => {
    setState(prev => ({
      ...prev,
      cleared: prev.cleared.includes(id) ? prev.cleared : [...prev.cleared, id]
    }))
  }
  const getQuizAnswers = (hurdleId) => state.quizAnswers[hurdleId] || {}
  const answerQuiz = (hurdleId, qi, answer) => {
    setState(prev => ({
      ...prev,
      quizAnswers: {
        ...prev.quizAnswers,
        [hurdleId]: { ...(prev.quizAnswers[hurdleId] || {}), [qi]: answer }
      }
    }))
  }
  const resetAll = () => setState({ cleared: [], quizAnswers: {} })

  return {
    cleared: state.cleared,
    isCleared,
    isUnlocked,
    clearHurdle,
    getQuizAnswers,
    answerQuiz,
    resetAll,
    totalCleared: state.cleared.length
  }
}
