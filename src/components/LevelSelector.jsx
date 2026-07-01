import { LEVELS } from '../data/hurdles'
import styles from './LevelSelector.module.css'

export default function LevelSelector({ onSelect }) {
  return (
    <div className={styles.wrap}>
      <p className={styles.eyebrow}>UK TIGER × tenhurdles.com</p>
      <h1 className={styles.title}>나에게 맞는 난이도는?</h1>
      <p className={styles.desc}>
        선택한 레벨에 맞춰 예문과 문제 난이도가 자동으로 조정됩니다.
      </p>

      <div className={styles.grid}>
        {LEVELS.map((lv) => (
          <button
            key={lv.id}
            className={styles.card}
            style={{ '--level-color': lv.color }}
            onClick={() => onSelect(lv.id)}
          >
            <span className={styles.bar} />
            <span className={styles.label}>{lv.label}</span>
            <span className={styles.arrow}>→</span>
          </button>
        ))}
      </div>
    </div>
  )
}
