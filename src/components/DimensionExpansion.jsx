import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './DimensionExpansion.module.css'

// Hurdle 02 — 명사의 차원 확장: 점(단어) → 선(구) → 면(절)
// 핵심 명사(선물/것/What)는 전 차원에서 코랄 레드(#FF4A5A)로 고정 (v6 확정 규칙)

const CAPTIONS = [
  '점(Dot): 코랄 레드 명사 하나가 수식 없이 존재하는 상태 — 선물(gift). 이 코랄 색은 차원이 커져도 절대 변하지 않는다.',
  '선(Line): 주어·동사 없이 순수하게 [수식 단어 + 단어]가 결합해 길이감이 생긴 상태 — 매우 소중한 선물(a very precious gift). 점이 이동한 흔적이 구(phrase)다.',
  '면(Plane): 이 선물이 왜 소중했을까? 아빠가 생일에 사다 주신 것이기 때문이다. WHAT이 [주어+동사]가 포함된 문장 전체를 하나의 거대한 명사 면으로 승격시켰다.',
]

const STEP_LABELS = ['0차원 · 점 = 단어', '1차원 · 선 = 구', '2차원 · 면 = 절']

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
        {/* 2차원 면: 민트→블루 그라데이션, 코랄 축 중심 확장 */}
        <div className={styles.plane}>
          <div className={styles.pLabel}>2차원 · 면 (PLANE) = 절</div>
          <div className={styles.pKo}>
            아빠가 올해 내 생일에 사다 주신 <span className={styles.coralPop}>것</span>
          </div>
          <div className={styles.pEn}>
            <span className={styles.coralPopSm}>What</span> my dad bought me for my birthday this year
          </div>
          <div className={styles.pNote}>
            WHAT이 [주어+동사]가 포함된 문장 전체를 거대한 명사 '면'으로 승격시켰다
          </div>
        </div>

        {/* 0~1차원: [매우 소중한] ── [선물] 순수 단어 결합 */}
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
        </div>

        <div className={styles.dotLabel}>0차원 · 점 (DOT) — 수식 없는 단어 하나</div>
      </div>

      <div className={styles.caption}>{CAPTIONS[stage]}</div>
    </div>
  )
}
