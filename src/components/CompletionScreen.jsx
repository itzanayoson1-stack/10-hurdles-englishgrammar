import styles from './CompletionScreen.module.css'

export default function CompletionScreen({ onReset }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>🏆</div>
      <h2 className={styles.title}>Grammar Manual Unlocked</h2>
      <p className={styles.sub}>
        10개의 허들을 모두 넘었습니다.<br />
        이제 문법은 암기가 아니라 설계입니다.<br />
        문장을 직접 작동시키십시오.
      </p>
      <div className={styles.stamp}>암기가 아니다. 설계다.</div>
      <button className={styles.resetBtn} onClick={onReset}>
        처음부터 다시 →
      </button>
    </div>
  )
}
