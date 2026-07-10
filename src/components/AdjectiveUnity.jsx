import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './AdjectiveUnity.module.css'

// HURDLE 05 — 형용사는 하나다 (3개 장면 탭 구성)
// ① 네임택 제거: 현재분사/과거분사/분사구문/관계사절 -> 전부 '형용사' 하나로 수렴
// ② 에너지 방향: excite 기준 -ing(쏘는 주체) vs p.p(맞는 대상)
// ③ 분사구문 자석 결합: Standing there, I saw her. 직독직해

const SCENES = ['① 형용사의 정체', '② 에너지 방향', '③ 분사구문 직독직해']

function SceneUnity({ active }) {
  const [phase, setPhase] = useState(0)
  const timers = useRef([])
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const play = useCallback(() => {
    clear()
    setPhase(0)
    timers.current.push(setTimeout(() => setPhase(1), 700))   // 망치 타격, 네임택 파괴
    timers.current.push(setTimeout(() => setPhase(2), 1500))  // 보석 등장 + 이동
    timers.current.push(setTimeout(() => setPhase(3), 2300))  // 결합 완료
  }, [])

  useEffect(() => { if (active) play(); return clear }, [active, play])

  return (
    <div className={styles.sceneBox}>
      <div className={`${styles.unityStage} ${styles['up' + phase]}`}>
        <div className={styles.nounCore}>
          <span className={styles.nounLabel}>person</span>
        </div>

        <div className={styles.tagCluster}>
          <span className={`${styles.tag} ${styles.tag1}`}>현재분사</span>
          <span className={`${styles.tag} ${styles.tag2}`}>과거분사</span>
          <span className={`${styles.tag} ${styles.tag3}`}>분사구문</span>
          <span className={`${styles.tag} ${styles.tag4}`}>관계사절</span>
        </div>

        <div className={styles.hammer}>🔨</div>
        <div className={styles.gem}>◆ 형용사</div>
      </div>

      <div className={`${styles.unityCaption} ${phase === 3 ? styles.shown : ''}`}>
        이름이 달라도, 하는 일은 하나 — <strong>명사를 꾸민다</strong>
      </div>

      <button type="button" className={styles.replaySm} onClick={play}>↺ 다시 보기</button>
    </div>
  )
}

function SceneEnergy({ active }) {
  const [phase, setPhase] = useState(0)
  const timers = useRef([])
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const play = useCallback(() => {
    clear()
    setPhase(0)
    timers.current.push(setTimeout(() => setPhase(1), 600))
    timers.current.push(setTimeout(() => setPhase(2), 1500))
    timers.current.push(setTimeout(() => setPhase(3), 2400))
  }, [])

  useEffect(() => { if (active) play(); return clear }, [active, play])

  return (
    <div className={styles.sceneBox}>
      <div className={styles.verbRow}>
        <span className={styles.verbBase}>excite</span>
        <span className={styles.verbWrong}>흥분하다</span>
        <span className={styles.verbRight}>흥분시키다</span>
      </div>

      <div className={`${styles.energyStage} ${styles['ep' + phase]}`}>
        <div className={styles.actor}>
          <div className={styles.actorFace}>😀</div>
          <div className={styles.actorKo}>회장님</div>
          <div className={`${styles.tagIng} ${phase >= 1 ? styles.shown : ''}`}>-ing</div>
        </div>

        <div className={styles.beamTrack}>
          <div className={styles.beam} />
        </div>

        <div className={styles.actor}>
          <div className={`${styles.actorFace} ${phase >= 2 ? styles.hit : ''}`}>
            {phase >= 2 ? '😲' : '🙂'}
          </div>
          <div className={styles.actorKo}>청중</div>
          <div className={`${styles.tagPp} ${phase >= 2 ? styles.shown : ''}`}>p.p</div>
        </div>
      </div>

      <div className={`${styles.energyResult} ${phase === 3 ? styles.shown : ''}`}>
        <span className={styles.resultOrange}>interesting person</span>
        <span className={styles.resultArrow}>·</span>
        <span className={styles.resultBlue}>excited audience</span>
      </div>
      <div className={`${styles.formulaKill} ${phase === 3 ? styles.shown : ''}`}>
        <span className={styles.strike}>사람이면 p.p, 사물이면 -ing</span> → 공식이 아니라 관계입니다
      </div>

      <button type="button" className={styles.replaySm} onClick={play}>↺ 다시 보기</button>
    </div>
  )
}

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
          <div className={styles.axisArrowDown}>↓</div>
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

      {scene === 0 && <SceneUnity active={scene === 0} />}
      {scene === 1 && <SceneEnergy active={scene === 1} />}
      {scene === 2 && <SceneParticiple active={scene === 2} />}
    </div>
  )
}
