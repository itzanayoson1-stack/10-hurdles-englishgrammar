import styles from './HurdleMap.module.css'

export default function HurdleMap({ hurdles, selectedId, isCleared, isUnlocked, onSelect }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.label}>허들 맵 — 10 Hurdles</div>
      <div className={styles.grid}>
        {hurdles.map(h => {
          const cleared = isCleared(h.id)
          const unlocked = isUnlocked(h.id)
          const active = selectedId === h.id

          let badge = null
          if (cleared) badge = <span className={`${styles.badge} ${styles.badgeCleared}`}>✓ CLEARED</span>
          else if (active) badge = <span className={`${styles.badge} ${styles.badgeActive}`}>▶ 진행중</span>
          else if (!unlocked) badge = <span className={`${styles.badge} ${styles.badgeLocked}`}>🔒 잠김</span>
          else badge = <span className={`${styles.badge} ${styles.badgeOpen}`}>도전 가능</span>

          return (
            <div
              key={h.id}
              className={[
                styles.card,
                active ? styles.active : '',
                cleared ? styles.cleared : '',
                !unlocked ? styles.locked : ''
              ].join(' ')}
              onClick={() => unlocked && onSelect(h.id)}
            >
              <div className={styles.num}>HURDLE {String(h.id).padStart(2, '0')}</div>
              <div className={styles.title}>{h.title}</div>
              {badge}
            </div>
          )
        })}
      </div>
    </div>
  )
}
