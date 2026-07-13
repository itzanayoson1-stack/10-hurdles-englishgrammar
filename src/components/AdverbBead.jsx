import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './AdverbBead.module.css'

// ================================================================
// HURDLE 06 — 부사 하이브리드 경험
// Neal.fun 리듬(여백 + 한 문장씩 전진) + Nicky Case 리듬(직접 조작)
//
// 페이지 안에 박스로 삽입되는 구조라 실제 스크롤 이벤트는 가로채지
// 않는다. 대신 "스테이지 클릭 = 전진"으로 neal.fun의 시각적 리듬을
// 재현한다 (여백, 한 번에 한 문장, 이전 문장은 fade-out).
//
// phase 흐름:
//   b0 → b1 → b2  (빌드업, 클릭 전진)
//   p2 (샌드박스: 명사 반사 체험, 건너뛰기 불가)
//   p3 (샌드박스: 동사 융합 성공)
//   c0 (클라이맥스 전환 문장, 클릭 전진)
//   p4 (샌드박스: 구 융합)
//   p5 (샌드박스: 절 융합)
//   c1 (클라이맥스 마무리 문장, 클릭 전진)
//   done (CLEARED)
// ================================================================

const BEADS = [
  { key: 'word', text: 'effectively', ko: '효과적으로', form: '단어' },
  { key: 'phrase', text: 'in the long run', ko: '장기적으로', form: '구' },
  { key: 'clause', text: 'because it is well-designed', ko: '잘 설계되었기 때문에', form: '절' },
]

export default function AdverbBead() {
  const [phase, setPhase] = useState('b0')
  const [bounced, setBounced] = useState(false)
  const [shield, setShield] = useState(false)
  const [shake, setShake] = useState(false)
  const [fusing, setFusing] = useState(false)
  const [fused, setFused] = useState([])
  const [selected, setSelected] = useState(false)
  const [bouncing, setBouncing] = useState(false)
  const [dragPos, setDragPos] = useState(null)

  const nounRef = useRef(null)
  const verbRef = useRef(null)
  const dragInfo = useRef(null)
  const timers = useRef([])

  const pushTimer = (fn, ms) => timers.current.push(setTimeout(fn, ms))
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const isSandbox = phase === 'p2' || phase === 'p4' || phase === 'p5'
  const beadIdx = phase === 'p2' || phase === 'p3' ? 0 : phase === 'p4' ? 1 : phase === 'p5' ? 2 : -1
  const bead = beadIdx >= 0 ? BEADS[beadIdx] : null

  // ---------- 판정 ----------
  const hitTest = (x, y, ref) => {
    if (!ref.current) return false
    const r = ref.current.getBoundingClientRect()
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
  }

  const doBounce = useCallback(() => {
    setShield(true); setShake(true); setBouncing(true)
    setBounced(true)
    pushTimer(() => setShield(false), 450)
    pushTimer(() => setShake(false), 400)
    pushTimer(() => setBouncing(false), 550)
  }, [])

  const doFuse = useCallback(() => {
    if (!bead) return
    setFusing(true)
    pushTimer(() => {
      setFused(f => [...f, bead.text])
      setFusing(false)
      if (phase === 'p2') { setPhase('p3') }
      else if (phase === 'p4') { setPhase('p5') }
      else if (phase === 'p5') { setPhase('c1') }
    }, 450)
  }, [bead, phase])

  const attemptDrop = useCallback((x, y) => {
    if (!isSandbox) return
    if (hitTest(x, y, nounRef)) { doBounce(); return }
    if (hitTest(x, y, verbRef)) {
      if (phase === 'p2' && !bounced) {
        setBouncing(true)
        pushTimer(() => setBouncing(false), 500)
        return
      }
      doFuse()
    }
  }, [isSandbox, phase, bounced, doBounce, doFuse])

  // ---------- 드래그 ----------
  const onBeadPointerDown = (e) => {
    if (!isSandbox || fusing || bouncing) return
    e.preventDefault()
    dragInfo.current = { startX: e.clientX, startY: e.clientY, moved: false }
    const onMove = (ev) => {
      const d = dragInfo.current
      if (!d) return
      const dx = ev.clientX - d.startX
      const dy = ev.clientY - d.startY
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) d.moved = true
      if (d.moved) setDragPos({ x: dx, y: dy })
    }
    const onUp = (ev) => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      const d = dragInfo.current
      dragInfo.current = null
      setDragPos(null)
      if (!d) return
      if (!d.moved) { setSelected(s => !s); return }
      attemptDrop(ev.clientX, ev.clientY)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const onNounTap = () => { if (selected && isSandbox) { setSelected(false); doBounce() } }
  const onVerbTap = () => {
    if (selected && isSandbox) {
      setSelected(false)
      if (phase === 'p2' && !bounced) {
        setBouncing(true)
        pushTimer(() => setBouncing(false), 500)
        return
      }
      doFuse()
    }
  }

  // ---------- 빌드업/클라이맥스 전진 (클릭 = neal.fun식 스크롤 리듬) ----------
  const advance = () => {
    if (phase === 'b0') setPhase('b1')
    else if (phase === 'b1') setPhase('b2')
    else if (phase === 'b2') setPhase('p2')
    else if (phase === 'c0') setPhase('p4')
    else if (phase === 'c1') setPhase('done')
  }

  const restart = () => {
    timers.current.forEach(clearTimeout); timers.current = []
    setPhase('b0'); setBounced(false); setShield(false); setShake(false)
    setFusing(false); setFused([]); setSelected(false); setBouncing(false); setDragPos(null)
  }

  const isBuildup = phase === 'b0' || phase === 'b1' || phase === 'b2' || phase === 'c0' || phase === 'c1'

  // ---------- 샌드박스 안내 카피 (최소화) ----------
  let guide = null
  if (phase === 'p2' && !bounced) guide = '넣어보세요.'
  else if (phase === 'p2' && bounced) guide = '동사에게는 열려 있다.'
  else if (phase === 'p3') guide = <><strong>effectively</strong> — 온도가 바뀌었다.</>
  else if (phase === 'p4') guide = 'in the long run.'
  else if (phase === 'p5') guide = 'because it is well-designed.'

  return (
    <div className={styles.wrap}>
      <div className={styles.headRow}>
        <div className={styles.sectionLabel}>부사는 문장의 분위기를 빚는다</div>
        {phase !== 'b0' && (
          <button type="button" className={styles.replaySm} onClick={restart}>↺ 처음부터</button>
        )}
      </div>

      {/* ---------- Neal.fun 모드: 빌드업 / 클라이맥스 ---------- */}
      {isBuildup && (
        <div className={styles.buildStage} onClick={advance}>
          {(phase === 'b0' || phase === 'b1' || phase === 'b2') && (
            <div className={styles.buildSentence}>
              <span className={styles.buildFade}>The policy</span>
              {(phase === 'b1' || phase === 'b2') && (
                <span className={`${styles.buildFade} ${styles.buildVerb}`}>works</span>
              )}
            </div>
          )}
          {phase === 'b2' && <div className={styles.buildCaption}>이미 완전하다.</div>}
          {phase === 'c0' && <div className={styles.buildLine}>구슬이 자란다.</div>}
          {phase === 'c1' && <div className={styles.buildLineBig}>형태는 셋. 역할은 하나.</div>}
          <div className={styles.buildHint}>›</div>
        </div>
      )}

      {/* ---------- Nicky Case 모드: 샌드박스 ---------- */}
      {isSandbox && (
        <div className={styles.stage}>
          <div className={styles.sentenceRow}>
            <span
              ref={nounRef}
              onClick={onNounTap}
              className={[
                styles.nounBox,
                shake ? styles.nounShake : '',
                selected ? styles.dropHint : '',
              ].join(' ')}
            >
              The policy
              {shield && <span className={styles.shieldRing} />}
            </span>
            <span
              ref={verbRef}
              onClick={onVerbTap}
              className={[
                styles.verbBox,
                fusing ? styles.verbFusing : '',
                (phase === 'p2' && bounced) || phase === 'p4' || phase === 'p5' ? styles.verbHint : '',
                selected ? styles.dropHint : '',
              ].join(' ')}
            >
              {fused.length > 0 && <span className={styles.fusedAdverb}>{fused[0]} </span>}
              works
            </span>
            <span className={styles.period}>.</span>
          </div>

          {fused.length > 1 && (
            <div className={styles.fusedTail}>
              {fused.slice(1).map(t => <span key={t} className={styles.fusedChip}>{t}</span>)}
            </div>
          )}

          {bead && (
            <div className={styles.beadArea}>
              <div
                onPointerDown={onBeadPointerDown}
                className={[
                  styles.beadObj,
                  bead.key !== 'word' ? styles.beadStretched : '',
                  selected ? styles.beadSelected : '',
                  bouncing ? styles.beadBounce : '',
                ].join(' ')}
                style={dragPos ? {
                  transform: `translate(${dragPos.x}px, ${dragPos.y}px) scale(1.12)`,
                  transition: 'none', zIndex: 10,
                } : undefined}
              >
                <span className={styles.beadText}>{bead.text}</span>
                <span className={styles.beadKo}>{bead.ko} · {bead.form}</span>
              </div>
              {selected && <div className={styles.tapTip}>어디에 넣을까요? 명사나 동사를 탭하세요</div>}
            </div>
          )}

          <div className={styles.guide}>{guide}</div>

          {phase === 'p3' && (
            <button type="button" className={styles.startBtn} onClick={() => setPhase('c0')}>
              계속
            </button>
          )}
        </div>
      )}

      {/* ---------- 최종 CLEARED ---------- */}
      {phase === 'done' && (
        <div className={styles.clearedWrap}>
          <div className={styles.summaryChips}>
            {BEADS.map(b => <span key={b.key} className={styles.sumChip}>{b.text}</span>)}
          </div>
          <div className={styles.clearedStamp}>HURDLE 06 CLEARED</div>
        </div>
      )}
    </div>
  )
}
