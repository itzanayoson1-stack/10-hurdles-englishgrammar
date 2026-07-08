import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './Hurdle01Intro.module.css'

// 4단계 공식 레벨별 예문 (Lv.3 = Business TOEIC 테마)
const LEVELS = [
  {
    tab: 'Lv.1 Explorer',
    name: 'Lv.1 Explorer (기초) — 점의 단계',
    ko: (
      <>
        <span className={styles.mA}>대한민국</span><span className={styles.mMark}>(A)</span>은 위대한{' '}
        <span className={styles.mB}>나라</span><span className={styles.mMark}>(B)</span>이다.
      </>
    ),
    en: (
      <>
        <span className={styles.mA}>South Korea</span> is a great <span className={styles.mB}>nation</span>.
      </>
    ),
    note: '가장 순수한 뼈대. A is B 하나가 문장의 전부다.',
  },
  {
    tab: 'Lv.2 Challenger',
    name: 'Lv.2 Challenger (기본) — 선의 단계',
    ko: (
      <>
        오늘날 <span className={styles.mPhrase}>인구 5천만의</span>{' '}
        <span className={styles.mA}>대한민국</span><span className={styles.mMark}>(A)</span>은{' '}
        <span className={styles.mClause}>지난 반세기 동안 눈부신 성장을 이뤄낸</span>{' '}
        <span className={styles.mB}>나라</span><span className={styles.mMark}>(B)</span>이다.
      </>
    ),
    en: (
      <>
        Today, <span className={styles.mA}>South Korea</span>,{' '}
        <span className={styles.mPhrase}>with a population of 50 million</span>, is a{' '}
        <span className={styles.mB}>nation</span>{' '}
        <span className={styles.mClause}>that has achieved remarkable growth over the past half-century</span>.
      </>
    ),
    note: '형용사구 1개 + 형용사절 1개. 자리는 그대로, 내용물이 커졌다.',
  },
  {
    tab: 'Lv.3 Professional',
    name: 'Lv.3 Professional (Business TOEIC) — 면의 단계',
    ko: (
      <>
        오늘날 <span className={styles.mPhrase}>글로벌 반도체 및 테크 시장을 선도하는</span>{' '}
        <span className={styles.mA}>대한민국</span><span className={styles.mMark}>(A)</span>은{' '}
        <span className={styles.mClause}>아시아 대륙 전역의 혁신을 이끄는</span>{' '}
        <span className={styles.mB}>경제 강국</span><span className={styles.mMark}>(B)</span>이다.
      </>
    ),
    en: (
      <>
        Today, <span className={styles.mA}>South Korea</span>,{' '}
        <span className={styles.mPhrase}>leading the global semiconductor and tech markets</span>, is an{' '}
        <span className={styles.mB}>economic powerhouse</span>{' '}
        <span className={styles.mClause}>that drives innovation across the Asian continent</span>.
      </>
    ),
    note: '비즈니스 토익 테마. B가 nation → economic powerhouse로 진화했다.',
  },
  {
    tab: 'Lv.4 Global',
    name: 'Lv.4 Global (마스터) — 입체 마스터 단계',
    ko: (
      <>
        <span className={styles.mClause}>한때 세계 최빈국으로 여겨졌던</span>{' '}
        <span className={styles.mA}>대한민국</span><span className={styles.mMark}>(A)</span>은,{' '}
        <span className={styles.mPhrase}>반도체와 문화 산업을 앞세워</span>,{' '}
        <span className={styles.mClause}>전 세계가 주목하는 경제적 도약을 이뤄낸</span>{' '}
        <span className={styles.mB}>나라</span><span className={styles.mMark}>(B)</span>이다.
      </>
    ),
    en: (
      <>
        <span className={styles.mClause}>Once regarded as one of the poorest countries in the world</span>,{' '}
        <span className={styles.mA}>South Korea</span>,{' '}
        <span className={styles.mPhrase}>driven by its semiconductor and cultural industries</span>, is a{' '}
        <span className={styles.mB}>nation</span>{' '}
        <span className={styles.mClause}>that has achieved an economic leap the whole world watches</span>.
      </>
    ),
    note: '분사구문 + 복합 수식이 겹겹이 쌓인 입체. 그래도 뼈대는 여전히 A is B 하나다.',
  },
]

export default function Hurdle01Intro() {
  // motion phase: 0 대기 → 1 FORGET 소멸 → 2 REMEMBER 확대 → 3 공식 등장
  const [phase, setPhase] = useState(0)
  const [level, setLevel] = useState(1)
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

  const lv = LEVELS[level]

  return (
    <div className={styles.wrap}>
      <div className={styles.headRow}>
        <button type="button" className={styles.replay} onClick={playMotion}>
          ↺ 모션 다시 보기
        </button>
      </div>

      {/* Step 1-2: FORGET(코랄) / REMEMBER(화이트+블랙) */}
      <div className={styles.stage}>
        <div className={`${styles.card} ${styles.discard} ${phase >= 1 ? styles.gone : ''}`}>
          <div className={styles.eyebrowDiscard}>FORGET</div>
          <div className={styles.bigDiscard}>1형식 ~ 5형식<br />암기</div>
        </div>
        <div className={`${styles.card} ${styles.keep} ${phase >= 2 ? styles.center : ''}`}>
          <div className={styles.eyebrowKeep}>REMEMBER</div>
          <div className={styles.bigKeep}>문장은<br />딱 두 종류</div>
        </div>
      </div>

      {/* Step 3: A is B (코랄) / A do B (민트) */}
      <div className={`${styles.formulas} ${phase >= 3 ? styles.shown : ''}`}>
        <div className={`${styles.formula} ${styles.fIs}`}>
          <div className={styles.fMain}>A is B</div>
          <div className={styles.fSub}>A는 B이다 · 상태/존재</div>
        </div>
        <div className={`${styles.formula} ${styles.fDo}`}>
          <div className={styles.fMain}>A do B</div>
          <div className={styles.fSub}>A가 B를 하다 · 동작/행위</div>
        </div>
      </div>

      {/* 레벨 탭 */}
      <div className={styles.tabs}>
        {LEVELS.map((l, i) => (
          <button
            key={l.tab}
            type="button"
            className={i === level ? styles.tabOn : styles.tab}
            onClick={() => setLevel(i)}
          >
            {l.tab}
          </button>
        ))}
      </div>

      {/* 예문 박스 */}
      <div className={styles.ex}>
        <div className={styles.exLabel}>{lv.name} — 자리는 그대로, 내용물만 커진다</div>
        <div className={styles.exKo}>{lv.ko}</div>
        <div className={styles.exEn}>{lv.en}</div>
        <div className={styles.exNote}>💡 {lv.note}</div>
      </div>

      {/* 범례 */}
      <div className={styles.legend}>
        <span><span className={styles.kA} />핵심 명사 A</span>
        <span><span className={styles.kB} />핵심 명사 B</span>
        <span><span className={styles.kP} />형용사구/분사구</span>
        <span><span className={styles.kC} />형용사절</span>
      </div>
    </div>
  )
}
