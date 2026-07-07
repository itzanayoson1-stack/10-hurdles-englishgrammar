import QuizBox from './QuizBox'
import styles from './HurdleDetail.module.css'

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

        <div className={styles.sectionLabel}>개념 설명</div>
        {hurdle.body.split('\n\n').map((para, i) => (
          <p key={i} className={styles.body}>{para}</p>
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
