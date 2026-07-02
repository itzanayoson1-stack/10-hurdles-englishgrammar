import { useMemo, useRef, useState } from 'react'
import { HURDLES, LEVELS } from './data/hurdles'
import { useProgress } from './hooks/useProgress'
import { pickQuizzes } from './utils/quizPicker'
import Hero from './components/Hero'
import HurdleMap from './components/HurdleMap'
import HurdleDetail from './components/HurdleDetail'
import CompletionScreen from './components/CompletionScreen'
import LevelSelector from './components/LevelSelector'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)
  const mapRef = useRef(null)
  const detailRef = useRef(null)

  const {
    level, setLevel, resetLevel,
    isCleared, isUnlocked, clearHurdle,
    getQuizAnswers, answerQuiz, resetAll, totalCleared
  } = useProgress()

  const baseHurdle = HURDLES.find(h => h.id === selectedId) || null

  // 허들 또는 레벨이 바뀔 때만 새로 뽑는다 (답을 고르는 매 순간마다 다시 뽑지 않도록).
  // 문제 풀(pool)이 8개보다 적으면 있는 만큼만, 많으면 안 겹치게 최대 8개를 뽑는다.
  const drawnQuizzes = useMemo(() => {
    if (!baseHurdle || !level) return []
    const pool = baseHurdle.levels[level].quizzes
    return pickQuizzes(level, baseHurdle.id, pool, 8)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, level])

  // 레벨 미선택 시 레벨 선택 화면만 표시
  if (!level) {
    return <LevelSelector onSelect={setLevel} />
  }

  const currentLevelLabel = LEVELS.find(lv => lv.id === level)?.label || level

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

  function handleChangeLevel() {
    if (window.confirm('레벨을 변경하시겠습니까? (현재 레벨의 진행 상황은 저장되어 있으니 나중에 같은 레벨을 다시 선택하면 이어서 할 수 있습니다)')) {
      resetLevel()
      setSelectedId(null)
    }
  }

  // 원본 허들 데이터(title/sub/core/body) + 선택된 레벨의 examples/summary +
  // 방금 랜덤으로 뽑힌 quizzes를 합쳐서 HurdleDetail이 기대하는 평평한 구조로 만들어준다.
  const selectedHurdle = baseHurdle
    ? {
        ...baseHurdle,
        examples: baseHurdle.levels[level].examples,
        summary: baseHurdle.levels[level].summary,
        quizzes: drawnQuizzes,
      }
    : null

  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: '8px', padding: '10px', fontSize: '12px', color: 'var(--text3)',
        borderBottom: '1px solid var(--border)'
      }}>
        <span>현재 레벨: <strong style={{ color: 'var(--text)' }}>{currentLevelLabel}</strong></span>
        <button
          onClick={handleChangeLevel}
          style={{
            background: 'none', border: '1px solid var(--border)', borderRadius: '4px',
            padding: '2px 10px', fontSize: '11px', color: 'var(--text2)', cursor: 'pointer'
          }}
        >
          레벨 변경
        </button>
      </div>

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
