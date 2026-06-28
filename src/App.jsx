import { useRef, useState } from 'react'
import { HURDLES } from './data/hurdles'
import { useProgress } from './hooks/useProgress'
import Hero from './components/Hero'
import HurdleMap from './components/HurdleMap'
import HurdleDetail from './components/HurdleDetail'
import CompletionScreen from './components/CompletionScreen'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)
  const mapRef = useRef(null)
  const detailRef = useRef(null)

  const {
    isCleared, isUnlocked, clearHurdle,
    getQuizAnswers, answerQuiz, resetAll, totalCleared
  } = useProgress()

  function handleStart() {
    const nextId = HURDLES.find(h => !isCleared(h.id))?.id || 1
    setSelectedId(nextId)
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  function handleSelect(id) {
    setSelectedId(id)
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  function handleClear(id) {
    clearHurdle(id)
    if (id < 10) {
      setTimeout(() => {
        setSelectedId(id + 1)
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 800)
    }
  }

  function handleReset() {
    if (window.confirm('모든 진행 상황이 초기화됩니다. 계속하시겠습니까?')) {
      resetAll()
      setSelectedId(null)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const selectedHurdle = HURDLES.find(h => h.id === selectedId) || null

  return (
    <div>
      <Hero totalCleared={totalCleared} onStart={handleStart} />
      <div ref={mapRef}>
        <HurdleMap
          hurdles={HURDLES}
          selectedId={selectedId}
          isCleared={isCleared}
          isUnlocked={isUnlocked}
          onSelect={handleSelect}
        />
      </div>
      <div ref={detailRef}>
        <HurdleDetail
          hurdle={selectedHurdle}
          isCleared={selectedHurdle ? isCleared(selectedHurdle.id) : false}
          quizAnswers={selectedHurdle ? getQuizAnswers(selectedHurdle.id) : {}}
          onAnswer={(qi, ans) => selectedHurdle && answerQuiz(selectedHurdle.id, qi, ans)}
          onClear={() => selectedHurdle && handleClear(selectedHurdle.id)}
        />
      </div>
      {totalCleared === 10 && <CompletionScreen onReset={handleReset} />}
    </div>
  )
}
