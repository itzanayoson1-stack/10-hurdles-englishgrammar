import { useState, useRef, useCallback } from 'react'
import styles from './VerbEngine.module.css'

// HURDLE 03 — 동사는 문장의 엔진이다
// 예문: The pitcher, who had struggled with an injury all season,
//       finally threw a perfect strike that silenced the crowd.
// 가짜 엔진(수식어 속 동사) 2개: had struggled / silenced
// 진짜 엔진(본동사) 1개: threw — 주어(투수)와 목적어(스트라이크)를 잇는다

export default function VerbEngine() {
  // phase: 0 대기(가동 전) -> 1 스캔 진행 -> 2 정지(엔진 확정 + 다이어그램)
  const [phase, setPhase] = useState(0)
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const runScan = useCallback(() => {
    clearTimers()
    setPhase(1)
    timers.current.push(setTimeout(() => setPhase(2), 1600))
  }, [])

  const reset = useCallback(() => {
    clearTimers()
    setPhase(0)
  }, [])

  return (
    <div className={styles.wrap}>
      <div className={styles.headRow}>
        <div className={styles.sectionLabel}>동사는 문장의 엔진이다 — 진짜 엔진 찾기</div>
      </div>

      <div className={`${styles.sentenceBox} ${styles['ph' + phase]}`}>
        {phase === 1 && <div className={styles.scanBar} />}

        <p className={styles.sentence}>
          <span className={styles.sSubject}>The pitcher</span>,{' '}
          <span className={styles.modifier}>who had struggled with an injury all season</span>,{' '}
          finally{' '}
          <span className={styles.verbWrap}>
            <span className={styles.gear}>⚙</span>
            <span className={styles.realVerb}>threw</span>
          </span>{' '}
          <span className={styles.sObject}>a perfect strike</span>{' '}
          <span className={styles.modifier}>that silenced the crowd</span>.
        </p>
      </div>

      {phase === 0 && (
        <button type="button" className={styles.scanBtn} onClick={runScan}>
          ⚙ 엔진 레이저 스캔 가동
        </button>
      )}
      {phase > 0 && (
        <button type="button" className={styles.rescanBtn} onClick={phase === 2 ? runScan : reset}>
          ↺ {phase === 2 ? '다시 스캔하기' : '스캔 중...'}
        </button>
      )}

      {/* 정지 화면: SUBJECT -> ENGINE -> OBJECT 다이어그램 (Hurdle 02 배지 재사용 + 골드 추가) */}
      <div className={`${styles.diagram} ${phase === 2 ? styles.diagramShown : ''}`}>
        <div className={styles.badgeCol}>
          <div className={styles.subjectBadge}>
            <div className={styles.badgeKo}>투수</div>
            <div className={styles.badgeEn}>pitcher</div>
          </div>
          <div className={styles.badgeLabel}>SUBJECT</div>
        </div>

        <div className={styles.arrowTrack}>
          <div className={styles.arrowBeam} />
        </div>

        <div className={styles.badgeCol}>
          <div className={styles.engineBadge}>
            <span className={styles.engineGear}>⚙</span>
            <div className={styles.badgeEn}>threw</div>
          </div>
          <div className={styles.badgeLabel}>ENGINE</div>
        </div>

        <div className={styles.arrowTrack}>
          <div className={styles.arrowBeam} />
        </div>

        <div className={styles.badgeCol}>
          <div className={styles.objectBadge}>
            <div className={styles.badgeKo}>스트라이크</div>
            <div className={styles.badgeEn}>a perfect strike</div>
          </div>
          <div className={styles.badgeLabel}>OBJECT</div>
        </div>
      </div>

      <div className={`${styles.summary} ${phase === 2 ? styles.summaryShown : ''}`}>
        문장이 아무리 길어져도 <strong>진짜 엔진(동사)은 threw 하나뿐</strong>입니다.
        나머지(who had struggled..., that silenced...)는 전부 수식어일 뿐입니다.
      </div>
    </div>
  )
}
