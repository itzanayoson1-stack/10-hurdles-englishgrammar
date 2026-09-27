import { useEffect, useRef, useState } from 'react'
import { annotate, annotationGroup } from 'rough-notation'
import styles from './Hurdle01Intro.module.css'

const isReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Hurdle01Intro() {
  const stageRef = useRef(null)
  const roleRefs = useRef([])
  const tryRefs = useRef([])
  const annotations = useRef([])
  const group = useRef(null)
  const played = useRef(false)
  const [choice, setChoice] = useState(null)

  useEffect(() => {
    played.current = false
    const specs = [
      ['box', '#176476'], ['underline', '#b73b49'], ['bracket', '#176476'],
      ['box', '#176476'], ['underline', '#b73b49'], ['bracket', '#176476'],
    ]
    annotations.current = roleRefs.current.map((el, i) => annotate(el, {
      type: specs[i][0], color: specs[i][1], padding: 5,
      strokeWidth: 2, animationDuration: 260, animate: !isReducedMotion(),
      ...(specs[i][0] === 'bracket' ? { brackets: ['bottom'] } : {}),
    }))
    group.current = annotationGroup(annotations.current)

    const play = () => {
      if (played.current) return
      played.current = true
      group.current.show()
    }
    if (!('IntersectionObserver' in window)) play()
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            play()
            observer.disconnect()
          }
        }, { threshold: 0.35 })
      : null
    observer?.observe(stageRef.current)

    return () => {
      observer?.disconnect()
      annotations.current.forEach(annotation => annotation.remove())
      group.current = null
    }
  }, [])

  const replay = () => {
    group.current?.hide()
    group.current?.show()
  }

  const choose = index => {
    if (choice === 1) return
    setChoice(index)
    if (index === 1) {
      const mark = annotate(tryRefs.current[1], {
        type: 'underline', color: '#b73b49', strokeWidth: 2,
        animate: !isReducedMotion(), animationDuration: 400,
      })
      mark.show()
      annotations.current.push(mark)
    }
  }

  return (
    <section className={styles.wrap} aria-label="BE와 일반동사 문장 구조 비교">
      <div className={styles.head}>
        <div>
          <span className={styles.kicker}>문장에서 직접 확인하기</span>
          <h3>무엇이 A를 이어주고, 무엇이 움직이는가?</h3>
        </div>
        <button type="button" className={styles.replay} onClick={replay}>↺ 표시 다시 보기</button>
      </div>

      <div ref={stageRef} className={styles.stage}>
        <div className={styles.card}>
          <span className={styles.caption}>A를 설명한다</span>
          <p className={styles.sentence}>
            <span ref={el => { roleRefs.current[0] = el }}>The plan</span>{' '}
            <span ref={el => { roleRefs.current[1] = el }}>is</span>{' '}
            <span ref={el => { roleRefs.current[2] = el }}>ready.</span>
          </p>
          <p className={styles.meaning}>그 계획은 준비되어 있다.</p>
          <p className={styles.note}><strong>A</strong> — <strong>is</strong> — A의 모습</p>
        </div>
        <div className={styles.card}>
          <span className={styles.caption}>행위가 대상으로 이어진다</span>
          <p className={styles.sentence}>
            <span ref={el => { roleRefs.current[3] = el }}>The team</span>{' '}
            <span ref={el => { roleRefs.current[4] = el }}>reviews</span>{' '}
            <span ref={el => { roleRefs.current[5] = el }}>the plan.</span>
          </p>
          <p className={styles.meaning}>그 팀은 계획을 검토한다.</p>
          <p className={styles.note}><strong>A</strong> — <strong>reviews</strong> — 검토하는 대상</p>
        </div>
      </div>

      <div className={styles.tryArea}>
        <span className={styles.kicker}>이제 직접 찾아보세요</span>
        <p className={styles.question}>다음 문장의 중심 동사는 무엇인가요?</p>
        <div className={styles.choices} role="group" aria-label="The manager approved the plan의 중심 동사 선택">
          {['The manager', 'approved', 'the plan.'].map((part, i) => (
            <button key={part} type="button" ref={el => { tryRefs.current[i] = el }}
              className={choice === i ? styles.chosen : ''}
              aria-pressed={choice === i} onClick={() => choose(i)}>{part}</button>
          ))}
        </div>
        <p className={styles.feedback} role="status">
          {choice === 1 ? '맞습니다. approved가 중심 동사이고, the plan은 승인의 대상입니다.'
            : choice === null ? '단어를 눌러 확인해 보세요.'
              : '누가 무엇을 했는지 알려주는 말을 찾아보세요.'}
        </p>
      </div>
      <p className={styles.scope}>BE / DO는 문장을 처음 읽을 때 쓰는 출발점입니다. 모든 동사의 의미를 둘로 나누는 규칙은 아닙니다.</p>
    </section>
  )
}
