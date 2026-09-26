import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './GateDash.module.css'

const DROP_SECONDS = 0.72

function Tiger({ outcome }) {
  return (
    <div className={`${styles.tiger} ${outcome === 'good' ? styles.hop : outcome === 'bad' ? styles.bump : ''}`} aria-hidden="true">
      {/* UK TIGER silhouette and scarf from the supplied gate_portrait_mockup.html. */}
      <svg viewBox="0 0 100 112" width="44" height="51" focusable="false">
        <g className={styles.tail}>
          <path d="M68 92 C88 92 97 79 94 60" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
          <path d="M85 85 L91 88 M92 74 L98 75" fill="none" stroke="var(--gd-paper)" strokeWidth="3.4" strokeLinecap="round" />
        </g>
        <circle cx="28" cy="19" r="13" fill="currentColor" />
        <circle cx="72" cy="19" r="13" fill="currentColor" />
        <circle cx="28" cy="17" r="5.5" fill="var(--gd-paper)" opacity=".55" />
        <circle cx="72" cy="17" r="5.5" fill="var(--gd-paper)" opacity=".55" />
        <rect x="30" y="60" width="40" height="44" rx="16" fill="currentColor" />
        <rect x="31" y="95" width="15" height="13" rx="6.5" fill="currentColor" />
        <rect x="54" y="95" width="15" height="13" rx="6.5" fill="currentColor" />
        <rect x="18" y="13" width="64" height="58" rx="25" fill="currentColor" />
        <path d="M38 24 L38 34 M50 21 L50 33 M62 24 L62 34" stroke="var(--gd-paper)" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 84 L40 92 M60 84 L60 92" stroke="var(--gd-paper)" strokeWidth="3.6" strokeLinecap="round" opacity=".85" />
        <rect x="26" y="62" width="48" height="13" rx="6.5" fill="var(--gd-orange)" />
        <path className={styles.scarf} d="M30 70 C16 69 7 60 3 49" fill="none" stroke="var(--gd-orange)" strokeWidth="9.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export default function GateDash({ quizzes, onTryQuiz }) {
  const [round, setRound] = useState(0)
  const [phase, setPhase] = useState('intro')
  const [choice, setChoice] = useState(null)
  const [outcome, setOutcome] = useState(null)
  const [combo, setCombo] = useState(0)
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState(3)
  const [previousExplanation, setPreviousExplanation] = useState('')
  const [feedbackAtTop, setFeedbackAtTop] = useState(false)
  const fieldRef = useRef(null)
  const wallRef = useRef(null)
  const feedbackRef = useRef(null)
  const questionRef = useRef(null)
  const nextRef = useRef(null)
  const progressRef = useRef(0)
  const endRef = useRef(0)
  const resolvedRef = useRef(false)
  const pausedRef = useRef(false)

  const current = quizzes[round]

  const advance = useCallback(() => {
    if (round === quizzes.length - 1) {
      setPhase('finished')
      return
    }
    setChoice(null)
    setOutcome(null)
    setFeedbackAtTop(false)
    setRound(value => value + 1)
    setPhase('preparing')
  }, [quizzes.length, round])

  const resolve = useCallback((selected) => {
    if (resolvedRef.current || !current) return
    resolvedRef.current = true
    const correct = selected === current.answer
    const multiplier = Math.round((1 + 1.5 * (1 - progressRef.current)) * 10) / 10
    const gained = correct ? Math.round((100 + Math.min(combo, 5) * 20) * multiplier) : 0
    setChoice(selected)
    setOutcome({ correct, gained, multiplier })
    setPreviousExplanation(current.exp)
    setCombo(value => correct ? value + 1 : 0)
    if (correct) setScore(value => value + gained)
    else setHearts(value => Math.max(0, value - 1))
    setPhase('result')
  }, [combo, current])

  useLayoutEffect(() => {
    if (phase !== 'entrance' && phase !== 'running') return undefined
    const field = fieldRef.current
    const wall = wallRef.current
    if (!field || !wall) return undefined

    const measure = () => {
      endRef.current = Math.max(110, field.clientHeight - 76 - wall.offsetHeight - 2)
    }
    measure()
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    observer?.observe(field)
    observer?.observe(wall)
    let frame = 0
    let last = 0
    let elapsed = 0
    if (phase === 'entrance') {
      progressRef.current = 0
      resolvedRef.current = false
      wall.style.transform = `translateY(${-wall.offsetHeight}px)`
    }
    const tick = now => {
      if (!last) last = now
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!pausedRef.current) {
        if (phase === 'entrance') {
          elapsed += dt
          const fraction = Math.min(1, elapsed / DROP_SECONDS)
          const eased = 1 - (1 - fraction) ** 3
          wall.style.transform = `translateY(${-wall.offsetHeight + eased * (wall.offsetHeight + 8)}px)`
          if (fraction === 1) {
            setPhase('running')
            return
          }
        } else if (!resolvedRef.current) {
          const duration = Math.max(3600, 6300 - combo * 260) / 1000
          progressRef.current = Math.min(1, progressRef.current + dt / duration)
          wall.style.transform = `translateY(${8 + (endRef.current - 8) * progressRef.current}px)`
          if (progressRef.current === 1) {
            resolve(null)
            return
          }
        }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [phase, round, combo, resolve])

  useEffect(() => {
    if (phase !== 'preparing') return undefined
    const frame = requestAnimationFrame(() => setPhase('entrance'))
    return () => cancelAnimationFrame(frame)
  }, [phase])

  useEffect(() => {
    if (phase !== 'result' || !outcome?.correct) return undefined
    const timeout = setTimeout(advance, 1300)
    return () => clearTimeout(timeout)
  }, [advance, outcome, phase])

  useEffect(() => {
    if (phase === 'result' && !outcome?.correct) nextRef.current?.focus()
    if (phase === 'running') questionRef.current?.focus()
  }, [phase, outcome])

  useEffect(() => {
    const onVisibility = () => { pausedRef.current = document.hidden }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useLayoutEffect(() => {
    if (phase !== 'result' || !fieldRef.current || !wallRef.current || !feedbackRef.current) return
    const field = fieldRef.current.getBoundingClientRect()
    const bottom = wallRef.current.getBoundingClientRect().bottom - field.top
    const topOfFeedback = field.height - 91 - feedbackRef.current.offsetHeight
    setFeedbackAtTop(bottom > topOfFeedback - 8)
  }, [phase, outcome])

  if (!quizzes.length) return null

  const onPick = index => {
    if (phase === 'running') resolve(index)
  }
  const restart = () => {
    setRound(0)
    setChoice(null)
    setOutcome(null)
    setCombo(0)
    setScore(0)
    setHearts(3)
    setPreviousExplanation('')
    setFeedbackAtTop(false)
    setPhase('preparing')
  }
  const hideContent = phase === 'intro' || phase === 'preparing'

  return (
    <div className={`${styles.game} ${hideContent ? styles.hideContent : ''}`}
      onKeyDown={event => {
        if (phase !== 'running' || event.altKey || event.ctrlKey || event.metaKey) return
        if (['1', '2', '3'].includes(event.key)) {
          event.preventDefault()
          onPick(Number(event.key) - 1)
        }
      }}>
      <header className={styles.mast}>
        <strong className={styles.logo}>10 hurdles<span aria-hidden="true" /></strong>
        <div className={styles.hud}><span>{String(round + 1).padStart(2, '0')} / {String(quizzes.length).padStart(2, '0')}</span><span className={styles.hearts} aria-label={`하트 ${hearts}개`}>{'♥ '.repeat(hearts)}{'♡ '.repeat(3 - hearts)}</span></div>
      </header>
      <div className={styles.cue}><small>통과 조건</small><strong ref={questionRef} tabIndex={-1}>{current.q}</strong></div>
      <div className={styles.field} ref={fieldRef}>
        <div className={`${styles.wall} ${phase === 'result' ? styles.resolved : ''}`} ref={wallRef}>
          {current.opts.map((option, index) => {
            const correct = phase === 'result' && index === current.answer
            const wrong = phase === 'result' && choice === index && !outcome?.correct
            return (
              <button key={index} type="button" onClick={() => onPick(index)}
                disabled={phase !== 'running'}
                className={`${styles.door} ${choice === index || correct ? styles.open : ''} ${correct ? styles.correct : ''} ${wrong ? styles.wrong : ''}`}
                aria-label={`${index + 1}번: ${option}`}>
                <span className={styles.frame} />
                <span className={styles.leaves}><span className={styles.leafLeft} /><span className={styles.leafRight} /></span>
                <span className={styles.face}><span className={styles.number}>{index + 1}</span><span className={styles.sentence}>{option}</span><span className={styles.mark}>{correct ? '✓' : wrong ? '✕' : ''}</span></span>
              </button>
            )
          })}
        </div>
        <div className={styles.impactLine} aria-hidden="true" />
        <div className={styles.ground} aria-hidden="true" />
        <Tiger outcome={phase === 'result' ? outcome?.correct ? 'good' : 'bad' : null} />
        {phase === 'result' && <>
          <div className={`${styles.float} ${!outcome.correct ? styles.floatBad : ''}`} aria-live="polite">{outcome.correct ? `✓ 정답 +${outcome.gained}` : '✕ 오답'}</div>
          <div ref={feedbackRef} className={`${styles.fieldFeedback} ${feedbackAtTop ? styles.atTop : ''} ${!outcome.correct ? styles.feedbackBad : ''}`} role="status">{current.exp}</div>
        </>}
      </div>
      <div className={styles.pad}>
        {phase === 'intro' && <div className={styles.ready}><span>시작을 누르면 문 세 개가 함께 나타난다</span><button type="button" className={styles.mainButton} onClick={() => setPhase('entrance')}>시작</button></div>}
        {(phase === 'entrance' || phase === 'running') && <div className={styles.controls}>
          <div className={styles.picks}>{[0, 1, 2].map(index => <button type="button" key={index} disabled={phase !== 'running'} onClick={() => onPick(index)} aria-label={`${index + 1}번 문`}>{index + 1}</button>)}</div>
          <p>문을 고르면 바로 결과가 나온다 · 일찍 고를수록 높은 점수</p>
        </div>}
        {phase === 'result' && <div className={styles.answer}>
          <strong>{outcome.correct ? '통과!' : `막혔다 · 정답 ${current.answer + 1}번`}</strong>
          <p>{current.exp}</p>
          {!outcome.correct && <button type="button" className={styles.mainButton} onClick={advance} ref={nextRef}>{round === quizzes.length - 1 ? '결과 보기' : '다음 문장'}</button>}
        </div>}
        {phase === 'finished' && <div className={styles.finished}>
          <strong>완주</strong><p>{score}점 · 원본 문항 {quizzes.length}개</p>
          <details className={styles.recap}><summary>마지막 문항 해설 보기</summary><p>{previousExplanation}</p></details>
          <button type="button" className={styles.mainButton} onClick={restart}>다시 달리기</button>
          <button type="button" className={styles.quizButton} onClick={onTryQuiz}>기존 퀴즈로 점검하기</button>
        </div>}
        {previousExplanation && (phase === 'entrance' || phase === 'running') && <details className={styles.recap} onToggle={event => { pausedRef.current = event.currentTarget.open || document.hidden }}>
          <summary>지난 문항 해설 보기</summary><p>{previousExplanation}</p>
        </details>}
      </div>
    </div>
  )
}
