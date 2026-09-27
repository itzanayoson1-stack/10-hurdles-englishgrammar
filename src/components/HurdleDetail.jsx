import { useRef, useState } from 'react'
import QuizBox from './QuizBox'
import GateDash from './GateDash'
import { quizKey } from '../utils/progressStore'
import Hurdle01Intro from './Hurdle01Intro'
import SentenceAxis from './SentenceAxis'
import VerbEngine from './VerbEngine'
import DimensionExpansion from './DimensionExpansion'
import AdjectiveUnity from './AdjectiveUnity'
import AdverbBead from './AdverbBead'
import styles from './HurdleDetail.module.css'

// "**굵게**", "==하이라이트==", "{{구 색상}}", "((절 색상))" 표시를 파싱
function renderRichText(text, keyPrefix) {
  const pattern = /(\*\*.+?\*\*|==.+?==|\{\{.+?\}\}|\(\(.+?\)\))/g
  const parts = text.split(pattern)
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key} className={styles.bold}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('==') && part.endsWith('==')) {
      return <mark key={key} className={styles.highlight}>{part.slice(2, -2)}</mark>
    }
    if (part.startsWith('{{') && part.endsWith('}}')) {
      return <strong key={key} className={styles.termPhrase}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('((') && part.endsWith('))')) {
      return <strong key={key} className={styles.termClause}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function MoreTheory({ details }) {
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)

  return (
    <>
      <button type="button" ref={triggerRef} className={styles.moreTheory}
        onClick={() => dialogRef.current?.showModal()}>
        설명 전체 보기 <span aria-hidden="true">↗</span>
      </button>
      <dialog ref={dialogRef} className={styles.theoryDialog}
        aria-labelledby="hurdle-one-theory-title"
        onClose={() => triggerRef.current?.focus()}
        onClick={event => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}>
        <div className={styles.dialogContent}>
          <div className={styles.dialogHeader}>
            <div>
              <div className={styles.eyebrow}>HURDLE 01 · 더 깊이 보기</div>
              <h3 id="hurdle-one-theory-title">두 갈래로 문장을 읽는 법</h3>
            </div>
            <button type="button" className={styles.dialogClose}
              onClick={() => dialogRef.current?.close()} aria-label="설명 창 닫기">✕</button>
          </div>
          {details.map((section, i) => (
            <section className={styles.dialogSection} key={section.title}>
              <h4>{section.title}</h4>
              {section.text.split('\n\n').map((para, j) => (
                <p key={j}>{renderRichText(para, `detail-${i}-${j}`)}</p>
              ))}
            </section>
          ))}
          <button type="button" className={styles.dialogDone}
            onClick={() => dialogRef.current?.close()}>문장으로 돌아가기</button>
        </div>
      </dialog>
    </>
  )
}

function PracticeArea({ hurdle, isCleared, quizAnswers, onAnswer, onClear }) {
  const [mode, setMode] = useState('game')

  return (
    <section className={styles.practice} aria-label="허들 연습">
      <h3 className={styles.practiceTitle}>문장을 넘는 연습</h3>
      <p className={styles.practiceIntro}>움직이는 문에서 답을 고르세요. 문을 고르는 즉시 결과가 나옵니다.</p>
      <div className={styles.modeSwitch} role="group" aria-label="연습 방식 선택">
        <button type="button" aria-pressed={mode === 'game'} className={mode === 'game' ? styles.activeMode : ''} onClick={() => setMode('game')}>게임으로 연습</button>
        <button type="button" aria-pressed={mode === 'quiz'} className={mode === 'quiz' ? styles.activeMode : ''} onClick={() => setMode('quiz')}>기존 퀴즈 · 허들 완료</button>
      </div>
      {mode === 'game' ? (
        <GateDash quizzes={hurdle.quizzes} onTryQuiz={() => setMode('quiz')} />
      ) : (
        <QuizBox hurdle={hurdle} answers={quizAnswers} onAnswer={onAnswer} onClear={onClear} isCleared={isCleared} />
      )}
    </section>
  )
}

export default function HurdleDetail({ hurdle, isCleared, quizAnswers, onAnswer, onClear }) {
  if (!hurdle) {
    return (
      <div className={styles.empty}>
        허들을 선택하면 내용이 표시됩니다.
      </div>
    )
  }

  return (
    <div className={styles.panel}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Hurdle {String(hurdle.id).padStart(2, '0')} / 10</div>
        <h2 className={styles.title}>{hurdle.title}</h2>
        <p className={styles.core}>{hurdle.core}</p>

        {/* 허들별 인터랙티브 컴포넌트: 01=문장 대비, 02=문장의 축, 03=동사=엔진, 04=점·선·면, 05=형용사 대통합, 06=부사 구슬 */}
        {hurdle.id === 1 && <Hurdle01Intro key={hurdle.id} />}
        {hurdle.id === 2 && <SentenceAxis key={hurdle.id} />}
        {hurdle.id === 3 && <VerbEngine key={hurdle.id} />}
        {hurdle.id === 4 && <DimensionExpansion key={hurdle.id} />}
        {hurdle.id === 5 && <AdjectiveUnity key={hurdle.id} />}
        {hurdle.id === 6 && <AdverbBead key={hurdle.id} />}

        <div className={styles.sectionLabel}>개념 설명</div>
        {hurdle.body.split('\n\n').map((para, i) => (
          <p key={i} className={styles.body}>{renderRichText(para, `body-${i}`)}</p>
        ))}
        {hurdle.details && <MoreTheory details={hurdle.details} />}

        <div className={styles.sectionLabel}>예문</div>
        <ul className={styles.examples}>
          {hurdle.examples.map((ex, i) => (
            <li key={i} className={styles.example}>
              <div className={styles.exEn}>{ex.en}</div>
              <div className={styles.exKo}>{ex.ko}</div>
            </li>
          ))}
        </ul>

        <div className={styles.sectionLabel}>핵심 요약</div>
        <div className={styles.summary}>{hurdle.summary}</div>

        <PracticeArea key={`${hurdle.id}:${hurdle.quizzes.map(quizKey).join('|')}`}
          hurdle={hurdle}
          quizAnswers={quizAnswers}
          onAnswer={onAnswer}
          onClear={onClear}
          isCleared={isCleared}
        />
      </div>
    </div>
  )
}
