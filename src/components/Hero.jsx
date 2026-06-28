import styles from './Hero.module.css'

export default function Hero({ totalCleared, onStart }) {
  const pct = (totalCleared / 10) * 100

  return (
    <section className={styles.hero}>
      <div className={styles.glow} />
      <span className={styles.tag}>UK TIGER × tenhurdles.com</span>
      <h1 className={styles.title}>
        Grammar <span className={styles.accent}>10</span> Hurdles
      </h1>
      <p className={styles.brand}>by UK TIGER 영어코치</p>
      <p className={styles.tagline}>암기가 아니다. 넘어라.</p>
      <p className={styles.desc}>
        영어 문법은 외우는 지식이 아닙니다.<br />
        문장을 작동시키는 매뉴얼입니다.<br />
        10개의 허들을 넘으면 문장이 보이기 시작합니다.
      </p>
      <div className={styles.progressWrap}>
        <div className={styles.progressLabel}>
          <span>진행률</span>
          <span>{totalCleared} / 10 완료</span>
        </div>
        <div className={styles.progressBg}>
          <div className={styles.progressFill} style={{ width: pct + '%' }} />
        </div>
      </div>
      <button className={styles.startBtn} onClick={onStart}>
        {totalCleared === 0 ? '첫 번째 허들 넘기 →' : '이어서 넘기 →'}
      </button>
    </section>
  )
}
