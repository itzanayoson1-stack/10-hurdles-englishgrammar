import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './DimensionExpansion.module.css'

// HURDLE 02 — 명사의 차원 확장: 점(단어) -> 선(구) -> 면(절)
// v7: 핵심 명사(선물/것/What)는 전 차원에서 딥 레드(#FF3B30)로 고정,
//     수식어·면은 마린 블루(#007AFF) 계열, 텍스트 미니멀리즘 적용

const STEP_LABELS = ['점 = 단어', '선 = 구', '면 = 절']

export default function DimensionExpansion() {
  const [stage, setStage] = useState(0)
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const playSequence = useCallback(() => {
    clearTimers()
    setStage(0)
    timers.current.push(setTimeout(() => setStage(1), 2000))
    timers.current.push(setTimeout(() => setStage(2), 4400))
  }, [])

  useEffect(() => {
    playSequence()
    return clearTimers
  }, [playSequence])

  return (
    <div className={styles.wrap}>
      <div className={styles.headRow}>
        <div className={styles.sectionLabel}>명사의 차원 확장 — 점 ➔ 선 ➔ 면</div>
        <button type="button" className={styles.replay} onClick={playSequence}>
          ↺ 다시 보기
        </button>
      </div>

      <div className={styles.steps}>
        {STEP_LABELS.map((label, i) => (
          <button
            key={label}
            type="button"
            className={i === stage ? styles.stepOn : styles.step}
            onClick={() => { clearTimers(); setStage(i) }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={`${styles.stage} ${styles['st' + stage]}`}>
        {/* 면: 마린 블루 그라데이션 — 레드 축 중심에서 사방 확장 */}
        <div className={styles.plane}>
          <div className={styles.pLabel}>면 (PLANE) = 절</div>
          <div className={styles.pKo}>
            아빠가 올해 내 생일에 사다 주신 <span className={styles.redPop}>것</span>
          </div>
          <div className={styles.pEn}>
            <span className={styles.redPopSm}>What</span> my dad bought me for my birthday this year
          </div>
        </div>

        {/* 점~선: 레드 명사를 축으로 양옆으로 뻗는 선 */}
        <div className={styles.lineLayer}>
          <div className={styles.modTrack}>
            <div className={styles.modBlock}>
              매우 소중한
              <span className={styles.modEn}>a very precious</span>
            </div>
            <div className={styles.modRay} />
          </div>
          <div className={styles.nounBadge}>
            선물
            <span className={styles.nounEn}>gift</span>
          </div>
          <div className={styles.rayRight} />
        </div>

        <div className={styles.dotLabel}>점 (DOT) — 수식 없는 단어 하나</div>
      </div>
    </div>
  )
}
