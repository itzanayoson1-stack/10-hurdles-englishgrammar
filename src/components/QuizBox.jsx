import { quizKey } from '../utils/progressStore'
import { nextPublished } from '../config/release'
import styles from './QuizBox.module.css'

export default function QuizBox({ hurdle, answers, onAnswer, onClear, isCleared }) {
  const allAnswered = hurdle.quizzes.length > 0 && hurdle.quizzes.every(q => answers[quizKey(q)] !== undefined)
  const score = hurdle.quizzes.filter(q => answers[quizKey(q)] === q.answer).length

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>퀴즈 — 이 허들을 넘었는가</div>
      {hurdle.quizzes.map((q, qi) => {
        const key = quizKey(q)
        const answered = answers[key]
        return (
          <div key={key} className={styles.item}>
            <div className={styles.q}>{qi + 1}. {q.q}</div>
            <div className={styles.opts}>
              {q.opts.map((opt, oi) => {
                let cls = styles.opt
                if (answered !== undefined) {
                  if (oi === q.answer) cls += ' ' + styles.correct
                  else if (oi === answered) cls += ' ' + styles.wrong
                  cls += ' ' + styles.disabled
                }
                return (
                  <button key={oi} disabled={answered !== undefined} className={cls} onClick={() => answered === undefined && onAnswer(key, oi)}>
                    {opt}
                  </button>
                )
              })}
            </div>
            {answered !== undefined && (
              <div className={`${styles.feedback} ${answered === q.answer ? styles.ok : styles.fail}`}>
                {answered === q.answer ? '✓ 정확합니다! ' : '✗ 다시 보세요. '}{q.exp}
              </div>
            )}
          </div>
        )
      })}

      {allAnswered && (
        <div className={styles.score}>
          <span className={styles.scoreNum}>{score}</span> / {hurdle.quizzes.length} 정답
        </div>
      )}

      {allAnswered && !isCleared && (
        <button className={styles.clearBtn} onClick={onClear}>
          Hurdle {hurdle.id} Clear →
        </button>
      )}

      {isCleared && (
        <div className={styles.toast}>
          <div className={styles.toastTitle}>Hurdle {hurdle.id} Cleared! 🎯</div>
          <div className={styles.toastSub}>
            {nextPublished(hurdle.id) !== null ? '다음 허들이 열렸습니다.' : '공개된 허들을 모두 완료했습니다. 허들 04~10은 준비 중입니다.'}
          </div>
        </div>
      )}
    </div>
  )
}
