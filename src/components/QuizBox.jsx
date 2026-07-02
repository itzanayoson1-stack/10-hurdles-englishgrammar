import styles from './QuizBox.module.css'

export default function QuizBox({ hurdle, answers, onAnswer, onClear, isCleared }) {
  const allAnswered = hurdle.quizzes.every((_, qi) => answers[qi] !== undefined)
  const score = hurdle.quizzes.filter((_, qi) => answers[qi] === hurdle.quizzes[qi].answer).length

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>퀴즈 — 이 허들을 넘었는가</div>
      {hurdle.quizzes.map((q, qi) => {
        const answered = answers[qi]
        return (
          <div key={qi} className={styles.item}>
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
                  <button key={oi} className={cls} onClick={() => answered === undefined && onAnswer(qi, oi)}>
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
            {hurdle.id < 10 ? '다음 허들이 열렸습니다.' : '모든 허들을 넘었습니다!'}
          </div>
        </div>
      )}
    </div>
  )
}
