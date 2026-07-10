import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './SentenceAxis.module.css'

// HURDLE 02 — 문장의 축
// SUBJECT = SUB(아래에서) + JECT(던지다) — 마음속 깊은 곳에서 위로 끌어올려 던진 에너지의 출발점
// OBJECT  = OB(바로 앞에) + JECT(던지다)  — 눈앞에 뚜렷이 놓인, 에너지가 부딪히는 도착점
// 예문: The pitcher throws the ball. / The batter hits the ball the pitcher throws.

export default function SentenceAxis() {
  // phase: 0 대기 -> 1 SUBJECT 등장 -> 2 OBJECT 등장 -> 3 동사 에너지 발사 -> 4 정지(예문 등장)
  const [phase, setPhase] = useState(0)
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const playMotion = useCallback(() => {
    clearTimers()
    setPhase(0)
    timers.current.push(setTimeout(() => setPhase(1), 300))
    timers.current.push(setTimeout(() => setPhase(2), 1100))
    timers.current.push(setTimeout(() => setPhase(3), 1900))
    timers.current.push(setTimeout(() => setPhase(4), 2700))
  }, [])

  useEffect(() => {
    playMotion()
    return clearTimers
  }, [playMotion])

  return (
    <div className={styles.wrap}>
      <div className={styles.headRow}>
        <div className={styles.sectionLabel}>문장의 축 — 주어 ── 동사 ──▶ 목적어</div>
        <button type="button" className={styles.replay} onClick={playMotion}>
          ↺ 다시 보기
        </button>
      </div>

      <div className={`${styles.stage} ${styles['ph' + phase]}`}>

        {/* SUBJECT: 코랄, 아래에서 위로 솟아오르는 에너지 */}
        <div className={styles.subCol}>
          <div className={styles.subjectBadge}>
            <div className={styles.badgeKo}>투수</div>
            <div className={styles.badgeEn}>pitcher</div>
          </div>
          <div className={styles.subArrowUp}>↑</div>
          <div className={styles.etymRow}>
            <span className={styles.etymSub}>SUB</span>
            <span className={styles.etymPlus}>+</span>
            <span className={styles.etymJect}>JECT</span>
          </div>
          <div className={styles.etymDesc}>아래에서 · 던지다</div>
        </div>

        {/* 동사 에너지 궤적 */}
        <div className={styles.energyTrack}>
          <div className={styles.energyBeam} />
          <div className={styles.verbLabel}>throws</div>
        </div>

        {/* OBJECT: 민트, 이미 눈앞에 고정된 대상 */}
        <div className={styles.objCol}>
          <div className={styles.objectBadge}>
            <div className={styles.badgeKo}>공</div>
            <div className={styles.badgeEn}>ball</div>
          </div>
          <div className={styles.objTarget}>◎</div>
          <div className={styles.etymRow}>
            <span className={styles.etymOb}>OB</span>
            <span className={styles.etymPlus}>+</span>
            <span className={styles.etymJect}>JECT</span>
          </div>
          <div className={styles.etymDesc}>바로 앞에 · 던지다</div>
        </div>
      </div>

      {/* 정지 화면: 기본 문장 + 확장 문장 */}
      <div className={`${styles.exWrap} ${phase >= 4 ? styles.exShown : ''}`}>
        <div className={styles.exRow}>
          <span className={styles.mSub}>The pitcher</span>
          <span className={styles.mVerb}>throws</span>
          <span className={styles.mObj}>the ball</span>
          <span className={styles.exDot}>.</span>
        </div>
        <div className={styles.exArrowDown}>↓ 확장 — 목적어가 절을 품는다</div>
        <div className={styles.exRow}>
          <span className={styles.mSub}>The batter</span>
          <span className={styles.mVerb}>hits</span>
          <span className={styles.mObjClause}>
            the ball <span className={styles.mSubInner}>the pitcher</span>{' '}
            <span className={styles.mVerbInner}>throws</span>
          </span>
          <span className={styles.exDot}>.</span>
        </div>
      </div>

      <div className={styles.legend}>
        <span><span className={styles.kSub} />주어 (SUBJECT)</span>
        <span><span className={styles.kVerb} />동사 (VERB)</span>
        <span><span className={styles.kObj} />목적어 (OBJECT)</span>
      </div>
    </div>
  )
}
