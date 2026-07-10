import QuizBox from './QuizBox'
import Hurdle01Intro from './Hurdle01Intro'
import SentenceAxis from './SentenceAxis'
import VerbEngine from './VerbEngine'
import DimensionExpansion from './DimensionExpansion'
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

        {/* 허들별 인터랙티브 컴포넌트: 01 = FORGET/REMEMBER 모션, 02 = 문장의 축, 03 = 동사=엔진 스캔, 04 = 점·선·면 차원 확장 */}
        {hurdle.id === 1 && <Hurdle01Intro key={hurdle.id} />}
        {hurdle.id === 2 && <SentenceAxis key={hurdle.id} />}
        {hurdle.id === 3 && <VerbEngine key={hurdle.id} />}
        {hurdle.id === 4 && <DimensionExpansion key={hurdle.id} />}

        <div className={styles.sectionLabel}>개념 설명</div>
        {hurdle.body.split('\n\n').map((para, i) => (
          <p key={i} className={styles.body}>{renderRichText(para, `body-${i}`)}</p>
        ))}

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

        <QuizBox
          hurdle={hurdle}
          answers={quizAnswers}
          onAnswer={onAnswer}
          onClear={onClear}
          isCleared={isCleared}
        />
      </div>
    </div>
  )
}
