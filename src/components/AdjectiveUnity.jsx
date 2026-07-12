import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './AdjectiveUnity.module.css'

// ================================================================
// HURDLE 05 — 형용사는 하나다 (Creative Direction Brief 반영판)
//
// 성공 기준(반드시 지킬 것):
//   ① 학생은 "문법이 늘었다"가 아니라 "줄었다"고 느껴야 한다
//   ② 용어(현재분사 등)보다 역할(형용사)이 먼저 보여야 한다
//   ③ 사람/사물 공식이 아니라 방향(Direction)으로 설명한다
//   ④ 분사구문은 뒤로 안 가고 왼쪽→오른쪽으로만 읽는다
//   ⑤ 마지막에 "아... 결국 다 형용사였네"를 유도한다
//
// 설명 순서 (반전 반영): 형용사(이미 안다) → 현재분사/과거분사/관계사절/
// 분사구문/To부정사/전치사구를 "같은 것의 다른 이름"으로 하나씩 흡수
// ================================================================

const SCENES = ['① 형용사로 수렴', '② 방향(Direction)', '③ 분사구문 직독직해']

// ----------------------------------------------------------------
// Scene 1 — Grammar Collapse
// [UI] 중앙에 이미 빛나는 "형용사=명사를 꾸며준다" 배지가 떠 있음
// [Motion] 6개 용어 태그가 가장자리에서 하나씩 날아와 형용사 코어에
//          흡수(scale-down + fade + 코어 pulse)됨 — 순서: 현재분사→
//          과거분사→관계사절→분사구문→To부정사→전치사구
// [Camera] 흡수가 끝나면 살짝 zoom-in, 태그라인 3줄이 순차 크로스페이드
// [Sound] 흡수마다 "톡" 소리, 마지막에 "HURDLE 05 CLEARED" 스탬프 쿵
// [Learning Purpose] 여러 용어가 사실 하나의 역할(형용사)이었다는 것을
//   "배운다"가 아니라 "원래 알던 것들이 사라지는" 방식으로 체감시킨다
// ----------------------------------------------------------------
const TERMS = ['현재분사', '과거분사', '관계사절', '분사구문', 'To부정사', '전치사구']
const TAGLINES = [
  '여러 이름, 하나의 원리.',
  '복잡했던 문법이 하나로 연결되는 순간.',
  '이름이 달라도 하는 일은 하나 — 형용사는 명사를 꾸며준다.',
]

function SceneCollapse({ active }) {
  const [absorbed, setAbsorbed] = useState(0)   // 몇 개까지 흡수됐는지
  const [tagline, setTagline] = useState(-1)     // -1: 아직 안 뜸
  const [cleared, setCleared] = useState(false)
  const timers = useRef([])
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const play = useCallback(() => {
    clear()
    setAbsorbed(0); setTagline(-1); setCleared(false)
    TERMS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setAbsorbed(i + 1), 500 + i * 420))
    })
    const afterAbsorb = 500 + TERMS.length * 420 + 300
    TAGLINES.forEach((_, i) => {
      timers.current.push(setTimeout(() => setTagline(i), afterAbsorb + i * 1300))
    })
    timers.current.push(setTimeout(() => setCleared(true), afterAbsorb + TAGLINES.length * 1300))
  }, [])

  useEffect(() => { if (active) play(); return clear }, [active, play])

  return (
    <div className={styles.sceneBox}>
      <div className={styles.collapseStage}>
        <div className={styles.coreWrap}>
          <div className={`${styles.core} ${absorbed > 0 ? styles.corePulsing : ''}`}>
            <span className={styles.coreAdj}>형용사</span>
            <span className={styles.coreArrow}>→</span>
            <span className={styles.coreNoun}>명사</span>
          </div>
          <div className={styles.coreCaption}>형용사는 명사를 꾸며준다</div>
        </div>

        <div className={styles.termOrbit}>
          {TERMS.map((t, i) => (
            <span
              key={t}
              className={`${styles.orbitTag} ${styles['orbit' + i]} ${i < absorbed ? styles.orbitAbsorbed : ''}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.taglineStage}>
        {TAGLINES.map((line, i) => (
          <div key={line} className={`${styles.taglineText} ${tagline === i ? styles.taglineShown : ''}`}>
            {line}
          </div>
        ))}
      </div>

      <div className={`${styles.clearedStamp} ${cleared ? styles.stampShown : ''}`}>
        HURDLE 05 CLEARED
      </div>

      <button type="button" className={styles.replaySm} onClick={play}>↺ 다시 보기</button>
    </div>
  )
}

// ----------------------------------------------------------------
// Scene 2 — Direction (사람/사물 공식 대신 방향으로 설명)
// Main ① throwing pitcher → thrown ball (공이 손을 떠나는 순간 슬로모션)
// Main ② operating engineer → manually operated machine
//        (※ "operated engine" 아님 — 반드시 machine)
// Secondary: interesting/interested — 보조 비교로만 짧게 노출
// ----------------------------------------------------------------
const EXAMPLE_SETS = [
  {
    key: 'baseball',
    icon: '⚾',
    label: '투수 · 공',
    subject: { ko: '투수', en: 'pitcher', result: 'throwing pitcher' },
    object: { ko: '공', en: 'ball', result: 'thrown ball' },
    verb: 'throw',
    slowmo: '공이 손을 떠나는 순간',
  },
  {
    key: 'machine',
    icon: '⚙',
    label: '엔지니어 · 기계',
    subject: { ko: '엔지니어', en: 'engineer', result: 'operating engineer' },
    object: { ko: '기계', en: 'machine', result: 'manually operated machine' },
    verb: 'operate',
    slowmo: '기계가 손에 의해 작동되는 순간',
  },
]

function SceneDirection({ active }) {
  const [setIdx, setSetIdx] = useState(0)
  const [phase, setPhase] = useState(0)
  const timers = useRef([])
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const play = useCallback(() => {
    clear()
    setPhase(0)
    timers.current.push(setTimeout(() => setPhase(1), 500))  // 방향 화살표(밖으로) 발사
    timers.current.push(setTimeout(() => setPhase(2), 1400)) // 도착 + 슬로모션 라벨
    timers.current.push(setTimeout(() => setPhase(3), 2300)) // 최종 결과 라벨 확정
  }, [])

  useEffect(() => { if (active) play(); return clear }, [active, play, setIdx])

  const ex = EXAMPLE_SETS[setIdx]

  return (
    <div className={styles.sceneBox}>
      <div className={styles.setToggle}>
        {EXAMPLE_SETS.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className={i === setIdx ? styles.setBtnOn : styles.setBtn}
            onClick={() => setSetIdx(i)}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      <div className={styles.directionPrinciple}>
        동사는 항상 <strong>방향</strong>을 가진다 — 에너지가{' '}
        <span className={styles.dirOut}>밖으로 향하면 -ing</span>,{' '}
        <span className={styles.dirIn}>받는 대상이면 p.p</span>
      </div>

      <div className={`${styles.directionStage} ${styles['dp' + phase]}`}>
        <div className={styles.dirCol}>
          <div className={styles.dirActor}>{ex.subject.ko}</div>
          <div className={styles.dirActorEn}>{ex.subject.en}</div>
          <div className={`${styles.dirTagOut} ${phase >= 1 ? styles.shown : ''}`}>-ing (발산)</div>
        </div>

        <div className={styles.dirTrack}>
          <div className={styles.dirArrowOut}>→</div>
          <div className={`${styles.slowmoLabel} ${phase === 2 ? styles.shown : ''}`}>{ex.slowmo}</div>
        </div>

        <div className={styles.dirCol}>
          <div className={`${styles.dirActor} ${phase >= 2 ? styles.dirActorHit : ''}`}>{ex.object.ko}</div>
          <div className={styles.dirActorEn}>{ex.object.en}</div>
          <div className={`${styles.dirTagIn} ${phase >= 2 ? styles.shown : ''}`}>p.p (수신)</div>
        </div>
      </div>

      <div className={`${styles.directionResult} ${phase === 3 ? styles.shown : ''}`}>
        <span className={styles.resultOrange}>{ex.subject.result}</span>
        <span className={styles.resultArrow}>↓</span>
        <span className={styles.resultBlue}>{ex.object.result}</span>
      </div>

      <div className={styles.secondaryNote}>
        참고 (전통 문법 비교용, 보조 예시): <span className={styles.secondaryChip}>interesting</span> /{' '}
        <span className={styles.secondaryChip}>interested</span> — 같은 방향의 원리가 적용된다
      </div>

      <button type="button" className={styles.replaySm} onClick={play}>↺ 다시 보기</button>
    </div>
  )
}

// ----------------------------------------------------------------
// Scene 3 — 분사구문 직독직해 (자석 결합)
// Reading Cursor는 절대 뒤로 가지 않는다. 왼쪽→오른쪽으로만 진행.
// 콤마를 지나는 순간 "Standing there"가 떠올라 "I" 위에 자석처럼 붙는다.
// ----------------------------------------------------------------
function SceneParticiple({ active }) {
  const [phase, setPhase] = useState(0) // 0 대기 1 스캔 2 결합완료
  const timers = useRef([])
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const play = useCallback(() => {
    clear()
    setPhase(0)
    timers.current.push(setTimeout(() => setPhase(1), 500))
    timers.current.push(setTimeout(() => setPhase(2), 1700))
  }, [])

  useEffect(() => { if (active) play(); return clear }, [active, play])

  return (
    <div className={styles.sceneBox}>
      <div className={styles.cursorNote}>Reading Cursor: 왼쪽 → 오른쪽으로만 이동, 절대 뒤로 가지 않는다</div>

      <div className={`${styles.readStage} ${styles['rp' + phase]}`}>
        {phase === 1 && <div className={styles.scanBarH} />}

        <div className={styles.readLine}>
          <span className={styles.participleBlock}>Standing there</span>
          <span>, </span>
          <span className={styles.subjMark}>I</span>
          <span> saw </span>
          <span className={styles.objMark}>her</span>
          <span>.</span>
        </div>
      </div>

      <div className={`${styles.axisRow} ${phase === 2 ? styles.shown : ''}`}>
        <div className={styles.axisCol}>
          <div className={styles.dockedTag}>Standing there</div>
          <div className={styles.axisArrowDown}>↓ 자석처럼 붙는다</div>
          <div className={styles.axisBadge} style={{ background: '#FF4A5A' }}>I</div>
          <div className={styles.axisLabel}>SUBJECT</div>
        </div>
        <div className={styles.axisArrow}>→</div>
        <div className={styles.axisCol}>
          <div className={styles.axisBadge} style={{ background: '#F5A623' }}>saw</div>
          <div className={styles.axisLabel}>ENGINE</div>
        </div>
        <div className={styles.axisArrow}>→</div>
        <div className={styles.axisCol}>
          <div className={styles.axisBadge} style={{ background: '#3FE0D0' }}>her</div>
          <div className={styles.axisLabel}>OBJECT</div>
        </div>
      </div>

      <div className={`${styles.unityCaption} ${phase === 2 ? styles.shown : ''}`}>
        '거기 서 있던' 나는 그녀를 보았다 — <strong>뒤로 안 가고 앞에서부터 읽으면 끝난다</strong>
      </div>

      <button type="button" className={styles.replaySm} onClick={play}>↺ 다시 보기</button>
    </div>
  )
}

export default function AdjectiveUnity() {
  const [scene, setScene] = useState(0)

  return (
    <div className={styles.wrap}>
      <div className={styles.headRow}>
        <div className={styles.sectionLabel}>형용사는 하나다</div>
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
      {scene === 1 && <SceneDirection active={scene === 1} />}
      {scene === 2 && <SceneParticiple active={scene === 2} />}
    </div>
  )
}
