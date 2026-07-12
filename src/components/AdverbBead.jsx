import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './AdverbBead.module.css'

// ================================================================
// HURDLE 06 — 부사 샌드박스 (Playable Experience)
// 명세서 v1.0 구현:
//  P1 뼈대 → P2 실패 체험(명사 반사, 건너뛰기 불가) → P3 성공(동사 융합)
//  → P4 대통합(구 → 절, 같은 구슬이 늘어날 뿐) → CLEARED
//
// 입력 방식:
//  - 데스크톱: 포인터 드래그 앤 드롭
//  - 모바일/접근성 폴백: 구슬 탭(선택) → 명사/동사 탭(배치)
//    (pointerup까지 이동거리 < 8px 이면 탭으로 판정, 두 방식 상시 병행)
//
// 색상 규칙: 반사 쉴드는 중립 회색(#9CA3AF) — 코랄 레드는 주어 고유색이므로 금지
// ================================================================

const BEADS = [
  { key: 'word', text: 'effectively', ko: '효과적으로', form: '단어' },
  { key: 'phrase', text: 'in the long run', ko: '장기적으로', form: '구' },
  { key: 'clause', text: 'because it is well-designed', ko: '잘 설계되었기 때문에', form: '절' },
]

export default function AdverbBead() {
  // phase: 1 뼈대 / 2 실패체험 / 3 성공직후 / 4 구 / 5 절 / 6 CLEARED
  const [phase, setPhase] = useState(1)
  const [bounced, setBounced] = useState(false)     // P2에서 명사 반사를 경험했는가
  const [shield, setShield] = useState(false)       // 명사 쉴드 파장 재생 중
  const [shake, setShake] = useState(false)         // 명사 흔들림
  const [fusing, setFusing] = useState(false)       // 동사 융합 이펙트 재생 중
  const [fused, setFused] = useState([])            // 융합 완료된 부사 텍스트들
  const [selected, setSelected] = useState(false)   // 탭-탭 모드: 구슬 선택 상태
  const [bouncing, setBouncing] = useState(false)   // 구슬 튕김 복귀 애니메이션
  const [dragPos, setDragPos] = useState(null)      // {x, y} 드래그 중 좌표

  const beadRef = useRef(null)
  const nounRef = useRef(null)
  const verbRef = useRef(null)
  const dragInfo = useRef(null) // { startX, startY, moved }
  const timers = useRef([])

  const pushTimer = (fn, ms) => timers.current.push(setTimeout(fn, ms))
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // 현재 단계의 구슬 (P2~3: 단어, P4: 구, P5: 절)
  const beadIdx = phase <= 3 ? 0 : phase === 4 ? 1 : phase === 5 ? 2 : -1
  const bead = beadIdx >= 0 ? BEADS[beadIdx] : null
  const beadInteractive = phase === 2 || phase === 4 || phase === 5

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
      if (phase === 2) {
        setPhase(3)
        pushTimer(() => setPhase(4), 2200) // 성공 메시지 잠시 보여준 뒤 P4
      } else if (phase === 4) {
        setPhase(5)
      } else if (phase === 5) {
        setPhase(6)
      }
    }, 450)
  }, [bead, phase])

  const attemptDrop = useCallback((x, y) => {
    if (!beadInteractive) return
    if (hitTest(x, y, nounRef)) {
      doBounce()
      return
    }
    if (hitTest(x, y, verbRef)) {
      // P2에서는 반드시 실패(반사)를 먼저 경험해야 융합 가능
      if (phase === 2 && !bounced) {
        setBouncing(true)
        pushTimer(() => setBouncing(false), 500)
        return
      }
      doFuse()
      return
    }
    // 빈 곳: 원위치 복귀만
  }, [beadInteractive, phase, bounced, doBounce, doFuse])

  // ---------- 드래그 (포인터 이벤트) ----------
  const onBeadPointerDown = (e) => {
    if (!beadInteractive || fusing || bouncing) return
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
      if (!d.moved) {
        // 탭으로 판정 → 선택 토글 (모바일/접근성 폴백)
        setSelected(s => !s)
        return
      }
      attemptDrop(ev.clientX, ev.clientY)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  // ---------- 탭-탭 폴백: 타겟 탭 ----------
  const onNounTap = () => {
    if (selected && beadInteractive) { setSelected(false); doBounce() }
  }
  const onVerbTap = () => {
    if (selected && beadInteractive) {
      setSelected(false)
      if (phase === 2 && !bounced) {
        setBouncing(true)
        pushTimer(() => setBouncing(false), 500)
        return
      }
      doFuse()
    }
  }

  const restart = () => {
    timers.current.forEach(clearTimeout); timers.current = []
    setPhase(1); setBounced(false); setShield(false); setShake(false)
    setFusing(false); setFused([]); setSelected(false); setBouncing(false); setDragPos(null)
  }

  // ---------- 단계별 안내 카피 ----------
  let guide = null
  if (phase === 1) guide = '이 문장은 이미 완전하다.'
  else if (phase === 2 && !bounced) guide = <>구슬을 먼저 <strong>명사(The policy)</strong>에 넣어보세요.</>
  else if (phase === 2 && bounced) guide = <>명사는 부사를 받지 않는다. 이제 <strong>동사(works)</strong>에 넣어보세요.</>
  else if (phase === 3) guide = <><strong>effectively</strong> — 문장의 온도가 바뀌었다. 뼈대는 그대로, 분위기만 달라졌다.</>
  else if (phase === 4) guide = <>구슬이 <strong>길어졌다({BEADS[1].form})</strong>. 그래도 구슬이다. 동사에 넣어보세요.</>
  else if (phase === 5) guide = <>한 번 더 <strong>길어졌다({BEADS[2].form})</strong>. 그래도 구슬이다.</>
  else if (phase === 6) guide = '형태는 셋. 역할은 하나.'

  return (
    <div className={styles.wrap}>
      <div className={styles.headRow}>
        <div className={styles.sectionLabel}>부사 샌드박스 — 직접 넣어보세요</div>
        {phase > 1 && (
          <button type="button" className={styles.replaySm} onClick={restart}>↺ 처음부터</button>
        )}
      </div>

      <div className={styles.stage}>
        {/* 문장 뼈대 */}
        <div className={styles.sentenceRow}>
          <span
            ref={nounRef}
            onClick={onNounTap}
            className={[
              styles.nounBox,
              shake ? styles.nounShake : '',
              selected && beadInteractive ? styles.dropHint : '',
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
              ((phase === 2 && bounced) || phase >= 4) && beadInteractive ? styles.verbHint : '',
              selected && beadInteractive ? styles.dropHint : '',
            ].join(' ')}
          >
            {fused.length > 0 && <span className={styles.fusedAdverb}>{fused[0]} </span>}
            works
          </span>
          <span className={styles.period}>.</span>
        </div>

        {/* 융합된 구/절은 문장 뒤에 이어붙음 */}
        {fused.length > 1 && (
          <div className={styles.fusedTail}>
            {fused.slice(1).map(t => (
              <span key={t} className={styles.fusedChip}>{t}</span>
            ))}
          </div>
        )}

        {/* 구슬 */}
        {bead && beadInteractive && (
          <div className={styles.beadArea}>
            <div
              ref={beadRef}
              onPointerDown={onBeadPointerDown}
              className={[
                styles.beadObj,
                bead.key !== 'word' ? styles.beadStretched : '',
                selected ? styles.beadSelected : '',
                bouncing ? styles.beadBounce : '',
              ].join(' ')}
              style={dragPos ? {
                transform: `translate(${dragPos.x}px, ${dragPos.y}px) scale(1.12)`,
                transition: 'none',
                zIndex: 10,
              } : undefined}
            >
              <span className={styles.beadText}>{bead.text}</span>
              <span className={styles.beadKo}>{bead.ko} · {bead.form}</span>
            </div>
            {selected && <div className={styles.tapTip}>어디에 넣을까요? 명사나 동사를 탭하세요</div>}
          </div>
        )}

        {phase === 1 && (
          <button type="button" className={styles.startBtn} onClick={() => setPhase(2)}>
            시작하기
          </button>
        )}

        {phase === 6 && (
          <div className={styles.clearedWrap}>
            <div className={styles.summaryChips}>
              {BEADS.map(b => (
                <span key={b.key} className={styles.sumChip}>{b.text}</span>
              ))}
            </div>
            <div className={styles.clearedStamp}>HURDLE 06 CLEARED</div>
          </div>
        )}
      </div>

      <div className={styles.guide}>{guide}</div>
    </div>
  )
}
