import { useEffect, useState } from 'react'
import { HURDLES, LEVELS } from './data/hurdles'
import { useProgress } from './hooks/useProgress'
import { pickQuizzes } from './utils/quizPicker'
import Hero from './components/Hero'
import HurdleMap from './components/HurdleMap'
import HurdleDetail from './components/HurdleDetail'
import { PUBLISHED_HURDLE_IDS, isPublished, nextPublished } from './config/release'
import LevelSelector from './components/LevelSelector'
import BlogYoutubeSection from './components/BlogYoutubeSection'
import { hurdleIdFromPath, hurdlePath } from './utils/hurdleRoute'
import styles from './App.module.css'

export default function App() {
  const [routeId, setRouteId] = useState(() => hurdleIdFromPath(window.location.pathname))
  const [selection, setSelection] = useState(null)
  const selectedId = selection?.id ?? null

  const {
    level, setLevel, resetLevel,
    isCleared, isUnlocked, clearHurdle,
    getQuizAnswers, answerQuiz, totalCleared
  } = useProgress()

  useEffect(() => {
    const onPopState = () => setRouteId(hurdleIdFromPath(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (routeId === null) {
      setSelection(null)
      return
    }
    const hurdle = HURDLES.find(h => h.id === routeId && isPublished(h.id))
    if (!level) return
    if (!hurdle || !isUnlocked(routeId)) {
      window.history.replaceState(null, '', '/')
      setRouteId(null)
      return
    }
    setSelection({ id: routeId, quizzes: pickQuizzes(level, routeId, hurdle.levels[level].quizzes, 8) })
  }, [routeId, level])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [routeId])

  const baseHurdle = HURDLES.find(h => h.id === selectedId && h.id === routeId && isPublished(h.id) && isUnlocked(h.id)) || null

  const drawnQuizzes = selection?.quizzes || []

  // 레벨 미선택 시 레벨 선택 화면만 표시
  if (!level) {
    return <LevelSelector onSelect={setLevel} />
  }

  const currentLevelLabel = LEVELS.find(lv => lv.id === level)?.label || level

  function navigate(id) {
    const path = id === null ? '/' : hurdlePath(id)
    if (window.location.pathname !== path) window.history.pushState(null, '', path)
    setRouteId(id)
  }

  function handleStart() {
    const nextId = PUBLISHED_HURDLE_IDS.find(id => !isCleared(id)) ?? PUBLISHED_HURDLE_IDS[0]
    handleSelect(nextId)
  }

  function handleSelect(id) {
    if (isUnlocked(id)) navigate(id)
  }

  function handleClear(id) {
    if (!isUnlocked(id)) return
    clearHurdle(id)
    const nextId = nextPublished(id)
    if (nextId !== null) navigate(nextId)
  }

  function handleChangeLevel() {
    if (window.confirm('레벨을 변경하시겠습니까? (현재 레벨의 진행 상황은 저장되어 있으니 나중에 같은 레벨을 다시 선택하면 이어서 할 수 있습니다)')) {
      resetLevel()
      navigate(null)
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
      <div className={styles.levelBar}>
        <span>현재 레벨: <strong>{currentLevelLabel}</strong></span>
        <button
          onClick={handleChangeLevel}
        >
          레벨 변경
        </button>
      </div>

      {routeId === null ? <>
        <Hero totalCleared={totalCleared} totalAvailable={PUBLISHED_HURDLE_IDS.length} onStart={handleStart} />
        <BlogYoutubeSection />
        <HurdleMap
          hurdles={HURDLES}
          selectedId={selectedId}
          isCleared={isCleared}
          isUnlocked={isUnlocked}
          onSelect={handleSelect}
        />
        {totalCleared === PUBLISHED_HURDLE_IDS.length && (
          <section role="status" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
            <h2>공개된 허들을 모두 완료했습니다.</h2>
            <p>허들 01~03을 복습할 수 있습니다. 허들 04~10은 준비 중입니다.</p>
            <button onClick={() => handleSelect(PUBLISHED_HURDLE_IDS[0])}>허들 01 복습하기</button>
          </section>
        )}
      </> : selectedHurdle && <main>
        <nav className={styles.navigation} aria-label="허들 이동">
          <button onClick={() => navigate(null)}>← 전체 허들로</button>
          <span>HURDLE {String(selectedHurdle.id).padStart(2, '0')} / 10</span>
        </nav>
        <HurdleDetail
          hurdle={selectedHurdle}
          isCleared={selectedHurdle ? isCleared(selectedHurdle.id) : false}
          quizAnswers={selectedHurdle ? getQuizAnswers(selectedHurdle.id) : {}}
          onAnswer={(qi, ans) => selectedHurdle && answerQuiz(selectedHurdle.id, qi, ans)}
          onClear={() => selectedHurdle && handleClear(selectedHurdle.id)}
        />
        <nav className={styles.footerNavigation} aria-label="다른 허들로 이동">
          <button onClick={() => navigate(null)}>← 전체 허들로</button>
          {nextPublished(selectedHurdle.id) !== null && isUnlocked(nextPublished(selectedHurdle.id)) &&
            <button onClick={() => handleSelect(nextPublished(selectedHurdle.id))}>다음 허들 →</button>}
        </nav>
      </main>}
    </div>
  )
}
