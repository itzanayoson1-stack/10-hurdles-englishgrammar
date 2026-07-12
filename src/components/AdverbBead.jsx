import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './AdverbBead.module.css'

// ================================================================
// HURDLE 06 — 부사도 하나다 (부사 구슬 · Adverb Bead)
// Concept vs Metaphor: '부사 구슬'은 메타포일 뿐, 새 문법 개념 아님.
//
// ① Cognitive Collapse: 점(단어)/선(구)/면(절) 형태의 부사 3종이
//    04번의 확장 언어를 역방향으로 압축 -> 보라색 구슬 하나로 수렴
// ② Nuance Molding: 부사가 '사실'은 안 바꾸고 '질감/분위기'만
//    바꾼다는 것을 동사 텍스트의 색·기울기·글로우로 시연
// ================================================================

const SCENES = ['① 부사 구슬로 수렴', '② 뉘앙스 빚기']

// ----------------------------------------------------------------
// Scene 1 — Cognitive Collapse (재설계판)
// 기준 문장(He solved the problem.)을 먼저 고정하고,
// 점(단어)/선(구)/면(절) 카드가 하나씩 켜지며 "→ solved를 꾸민다"를
// 3회 반복 확인한 뒤에야 구슬로 압축된다.
// phase: 0 대기 → 1/2/3 카드 순차 활성화 → 4 압축 → 5 구슬+요약
// ----------------------------------------------------------------
const ADVERB_FORMS = [
  { badge: '점 · 단어', en: 'quickly', ko: '빠르게', width: 'formDot' },
  { badge: '선 · 구', en: 'in a hurry', ko: '서둘러서', width: 'formLine' },
  { badge: '면 · 절', en: 'because he was late', ko: '늦었기 때문에', width: 'formPlane' },
]

function SceneCollapse({ active }) {
  const [phase, setPhase] = useState(0)
  const timers = useRef([])
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const play = useCallback(() => {
    clear()
    setPhase(0)
    timers.current.push(setTimeout(() => setPhase(1), 900))   // 점 활성화
    timers.current.push(setTimeout(() => setPhase(2), 2400))  // 선 활성화
    timers.current.push(setTimeout(() => setPhase(3), 3900))  // 면 활성화
    timers.current.push(setTimeout(() => setPhase(4), 5600))  // 압축 시작
    timers.current.push(setTimeout(() => setPhase(5), 6700))  // 구슬 + 요약
  }, [])

  useEffect(() => { if (active) play(); return clear }, [active, play])

  return (
    <div className={styles.sceneBox}>
      {/* 기준 문장 — 부사가 꾸밀 대상(동사)을 먼저 보여준다 */}
      <div className={styles.baseSentence}>
        He <span className={styles.baseVerb}>solved</span> the problem
        <span className={styles.baseSlot}>{phase >= 1 && phase < 4 ? ' + ?' : '.'}</span>
      </div>

      <div className={`${styles.collapseStage} ${styles['cp' + phase]}`}>
        {ADVERB_FORMS.map((f, i) => (
          <div
            key={f.en}
            className={[
              styles.formCard,
              styles[f.width],
              phase >= i + 1 && phase < 4 ? styles.formActive : '',
              phase >= 4 ? styles.formCollapse : '',
            ].join(' ')}
          >
            <span className={styles.formBadge}>{f.badge}</span>
            <span className={styles.formEn}>{f.en}</span>
            <span className={styles.formKo}>{f.ko}</span>
            <span className={`${styles.formRole} ${phase >= i + 1 && phase < 4 ? styles.shown : ''}`}>
              → solved를 꾸민다
            </span>
          </div>
        ))}

        <div className={`${styles.bead} ${phase >= 5 ? styles.beadShown : ''}`}>
          <span className={styles.beadCore} />
          <span className={styles.beadLabel}>부사</span>
        </div>
      </div>

      <div className={`${styles.collapseSummary} ${phase >= 5 ? styles.shown : ''}`}>
        <div className={styles.summaryLine}>
          <span className={styles.sumChip}>quickly</span>
          <span className={styles.sumChip}>in a hurry</span>
          <span className={styles.sumChip}>because he was late</span>
        </div>
        <div className={styles.collapseCaption}>
          형태는 셋(점·선·면)이지만 <strong>역할은 하나</strong> — 전부 solved를 꾸미는 부사입니다
        </div>
      </div>

      <button type="button" className={styles.replaySm} onClick={play}>↺ 다시 보기</button>
    </div>
  )
}

// ----------------------------------------------------------------
// Scene 2 — Nuance Molding
// ----------------------------------------------------------------
const MOLDS = [
  { key: 'quickly', label: 'quickly', ko: '빠르게', cls: 'moldFast', desc: '속도감 — 기울고 잔상이 남는다' },
  { key: 'carefully', label: 'carefully', ko: '신중하게', cls: 'moldCareful', desc: '무게감 — 두껍고 차분하게 빛난다' },
  { key: 'reluctantly', label: 'reluctantly', ko: '마지못해', cls: 'moldReluctant', desc: '무기력함 — 아래로 처지고 채도가 낮아진다' },
]

function SceneMolding({ active }) {
  const [molded, setMolded] = useState(null) // null | mold key
  const [showAll, setShowAll] = useState(false)
  const [dock, setDock] = useState(0) // 최종 화면: 구슬이 자유롭게 붙는 위치 데모
  const timers = useRef([])
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const play = useCallback(() => {
    clear()
    setMolded(null); setShowAll(false)
    timers.current.push(setTimeout(() => setMolded('quickly'), 700))
    timers.current.push(setTimeout(() => setShowAll(true), 2100))
  }, [])

  useEffect(() => { if (active) play(); return clear }, [active, play])

  useEffect(() => {
    if (!showAll) return
    const t = setInterval(() => setDock(d => (d + 1) % 3), 1400)
    return () => clearInterval(t)
  }, [showAll])

  return (
    <div className={styles.sceneBox}>
      {/* Step 1-2: 뼈대 고정 + 구슬 접촉 -> 질감 변화 */}
      <div className={styles.factRow}>
        <span className={styles.factTag}>FACT (불변)</span>
        <span className={styles.factSentence}>He solved the problem.</span>
      </div>

      <div className={styles.moldStage}>
        <div className={styles.moldBeadTrack}>
          <span className={`${styles.moldBead} ${molded ? styles.moldBeadGone : ''}`} />
        </div>
        <div className={styles.moldSentence}>
          He{' '}
          <span className={`${styles.moldVerb} ${molded ? styles[MOLDS.find(m => m.key === molded).cls] : ''}`}>
            solved
          </span>{' '}
          the problem.
        </div>
      </div>

      {/* Step 3: 3분할 비교 */}
      <div className={`${styles.compareGrid} ${showAll ? styles.shown : ''}`}>
        {MOLDS.map(m => (
          <div key={m.key} className={styles.compareCol}>
            <div className={`${styles.compareVerb} ${styles[m.cls]}`}>{m.label}</div>
            <div className={styles.compareKo}>{m.ko}</div>
            <div className={styles.compareDesc}>{m.desc}</div>
          </div>
        ))}
      </div>
      <div className={`${styles.moldCaption} ${showAll ? styles.shown : ''}`}>
        사실은 하나, 분위기는 셋 — <strong>부사는 온도를 조절할 뿐 뼈대를 바꾸지 않는다</strong>
      </div>

      {/* 최종: S-V-O 뼈대 고정 + 구슬이 자유롭게 위치 이동 */}
      <div className={`${styles.axisDemo} ${showAll ? styles.shown : ''}`}>
        <div className={styles.axisSentence}>
          {dock === 0 && <span className={styles.freeBead}>quickly </span>}
          <span className={styles.axisBadge} style={{ background: '#FF4A5A' }}>He</span>{' '}
          {dock === 1 && <span className={styles.freeBead}>quickly </span>}
          <span className={styles.axisBadge} style={{ background: '#F5A623' }}>solved</span>{' '}
          <span className={styles.axisBadge} style={{ background: '#3FE0D0' }}>the problem</span>
          {dock === 2 && <span className={styles.freeBead}> quickly</span>}
        </div>
        <div className={styles.axisNote}>뼈대(주어·동사·목적어)는 고정, 부사 구슬만 자유롭게 이동한다</div>
      </div>

      <div className={`${styles.clearedStamp} ${showAll ? styles.stampShown : ''}`}>
        HURDLE 06 CLEARED
      </div>

      <button type="button" className={styles.replaySm} onClick={play}>↺ 다시 보기</button>
    </div>
  )
}

export default function AdverbBead() {
  const [scene, setScene] = useState(0)

  return (
    <div className={styles.wrap}>
      <div className={styles.headRow}>
        <div className={styles.sectionLabel}>부사도 하나다</div>
      </div>

      <div className={styles.tabs}>
        {SCENES.map((label, i) => (
          <button
            key={label}
            type="button"
            className={i === scene ? styles.tabOn : styles.tab}
            onClick={() => setScene(i)}
          >
            {label}
          </button>
        ))}
      </div>

      {scene === 0 && <SceneCollapse active={scene === 0} />}
      {scene === 1 && <SceneMolding active={scene === 1} />}
    </div>
  )
}
