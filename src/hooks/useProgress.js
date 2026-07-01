import { useState, useEffect } from 'react'

const LEVEL_KEY = 'g10h_level'
const stateKey = (level) => `g10h_v1_${level}`

function loadLevel() {
  try {
    return localStorage.getItem(LEVEL_KEY) || null
  } catch (e) {
    return null
  }
}

function loadState(level) {
  try {
    const raw = localStorage.getItem(stateKey(level))
    if (raw) return JSON.parse(raw)
  } catch (e) {}
  return { cleared: [], quizAnswers: {} }
}

function saveState(level, state) {
  try {
    localStorage.setItem(stateKey(level), JSON.stringify(state))
  } catch (e) {}
}

export function useProgress() {
  const [level, setLevelRaw] = useState(loadLevel)
  const [state, setState] = useState(() => (level ? loadState(level) : { cleared: [], quizAnswers: {} }))

  // 레벨이 바뀌면 해당 레벨의 저장된 진행 상황을 불러온다
  useEffect(() => {
    if (level) setState(loadState(level))
  }, [level])

  useEffect(() => {
    if (level) saveState(level, state)
  }, [level, state])

  function setLevel(newLevel) {
    try {
      localStorage.setItem(LEVEL_KEY, newLevel)
    } catch (e) {}
    setLevelRaw(newLevel)
  }

  function resetLevel() {
    try {
      localStorage.removeItem(LEVEL_KEY)
    } catch (e) {}
    setLevelRaw(null)
    setState({ cleared: [], quizAnswers: {} })
  }

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
    level,
    setLevel,
    resetLevel,
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
