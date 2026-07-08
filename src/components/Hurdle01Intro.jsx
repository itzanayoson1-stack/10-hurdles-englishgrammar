import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './Hurdle01Intro.module.css'

// HURDLE 01 — v7 미니멀 고대비
// 좌우 대비: FORGET(레드) / REMEMBER(블루) · 상하 대비: A is B(레드) / A do B(블루)
// 줄글 설명·예문은 제거하고 도형+타이포만으로 구조를 전달한다.
export default function Hurdle01Intro() {
  // motion phase: 0 대기 -> 1 FORGET 소멸 -> 2 REMEMBER 확대 -> 3 공식 등장
  const [phase, setPhase] = useState(0)
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const playMotion = useCallback(() => {
    clearTimers()
    setPhase(0)
    timers.current.push(setTimeout(() => setPhase(1), 1000))
    timers.current.push(setTimeout(() => setPhase(2), 1800))
    timers.current.push(setTimeout(() => setPhase(3), 2600))
  }, [])

  useEffect(() => {
    playMotion()
    return clearTimers
  }, [playMotion])

  return (
    <div className={styles.wrap}>
      <div className={styles.headRow}>
        <button type="button" className={styles.replay} onClick={playMotion}>
          ↺ 다시 보기
        </button>
      </div>

      {/* 좌우 대비: FORGET(레드) / REMEMBER(블루) */}
      <div className={styles.stage}>
        <div className={`${styles.card} ${styles.discard} ${phase >= 1 ? styles.gone : ''}`}>
          <div className={styles.eyebrow}>FORGET</div>
          <div className={styles.big}>1형식 ~ 5형식</div>
        </div>
        <div className={`${styles.card} ${styles.keep} ${phase >= 2 ? styles.center : ''}`}>
          <div className={styles.eyebrow}>REMEMBER</div>
          <div className={styles.big}>딱 두 종류</div>
        </div>
      </div>

      {/* 상하 대비: A is B(레드, 상단) / A do B(블루, 하단) */}
      <div className={`${styles.formulas} ${phase >= 3 ? styles.shown : ''}`}>
        <div className={`${styles.formula} ${styles.fIs}`}>
          <span className={styles.fMain}>A is B</span>
          <span className={styles.fSub}>상태 · 존재</span>
        </div>
        <div className={`${styles.formula} ${styles.fDo}`}>
          <span className={styles.fMain}>A do B</span>
          <span className={styles.fSub}>동작 · 행위</span>
        </div>
      </div>
    </div>
  )
}
