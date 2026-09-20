import { useRef, useState } from 'react'
import { HURDLES, LEVELS } from './data/hurdles'
import { useProgress } from './hooks/useProgress'
import { pickQuizzes } from './utils/quizPicker'
import Hero from './components/Hero'
import HurdleMap from './components/HurdleMap'
import HurdleDetail from './components/HurdleDetail'
import { PUBLISHED_HURDLE_IDS, isPublished, nextPublished } from './config/release'
import LevelSelector from './components/LevelSelector'
import BlogYoutubeSection from './components/BlogYoutubeSection'

export default function App() {
  const [selection, setSelection] = useState(null)
  const selectedId = selection?.id ?? null
  const mapRef = useRef(null)
  const detailRef = useRef(null)

  const {
    level, setLevel, resetLevel,
    isCleared, isUnlocked, clearHurdle,
    getQuizAnswers, answerQuiz, totalCleared
  } = useProgress()

  const baseHurdle = HURDLES.find(h => h.id === selectedId && isPublished(h.id) && isUnlocked(h.id)) || null

  const drawnQuizzes = selection?.quizzes || []

  // 레벨 미선택 시 레벨 선택 화면만 표시
  if (!level) {
    return <LevelSelector onSelect={setLevel} />
  }

  const currentLevelLabel = LEVELS.find(lv => lv.id === level)?.label || level

  function selectHurdle(id) {
    const hurdle = HURDLES.find(h => h.id === id && isPublished(h.id))
    if (!hurdle) return
    setSelection({ id, quizzes: pickQuizzes(level, id, hurdle.levels[level].quizzes, 8) })
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  function handleStart() {
    const nextId = PUBLISHED_HURDLE_IDS.find(id => !isCleared(id)) ?? PUBLISHED_HURDLE_IDS[0]
    handleSelect(nextId)
  }

  function handleSelect(id) {
    if (isUnlocked(id)) selectHurdle(id)
  }

  function handleClear(id) {
    if (!isUnlocked(id)) return
    clearHurdle(id)
    const nextId = nextPublished(id)
    if (nextId !== null) selectHurdle(nextId)
  }

  function handleChangeLevel() {
    if (window.confirm('레벨을 변경하시겠습니까? (현재 레벨의 진행 상황은 저장되어 있으니 나중에 같은 레벨을 다시 선택하면 이어서 할 수 있습니다)')) {
      resetLevel()
      setSelection(null)
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

      <Hero totalCleared={totalCleared} totalAvailable={PUBLISHED_HURDLE_IDS.length} onStart={handleStart} />
      <BlogYoutubeSection />
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
      {totalCleared === PUBLISHED_HURDLE_IDS.length && (
        <section role="status" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
          <h2>공개된 허들을 모두 완료했습니다.</h2>
          <p>허들 01~03을 복습할 수 있습니다. 허들 04~10은 준비 중입니다.</p>
          <button onClick={() => handleSelect(PUBLISHED_HURDLE_IDS[0])}>허들 01 복습하기</button>
        </section>
      )}
    </div>
  )
}
