import { isPublished } from '../config/release'
import styles from './HurdleMap.module.css'

// 코치님이 직접 제작한 허들별 고유 손그림 일러스트 (public/hurdle-icons/ 에 위치)
const iconPath = (id) => `/hurdle-icons/hurdle-${String(id).padStart(2, '0')}-icon.svg`

export default function HurdleMap({ hurdles, selectedId, isCleared, isUnlocked, onSelect }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.label}>허들 맵 — 10 Hurdles</div>
      <div className={styles.grid}>
        {hurdles.map(h => {
          const published = isPublished(h.id)
          const cleared = isCleared(h.id)
          const unlocked = isUnlocked(h.id)
          const active = selectedId === h.id

          let badge = null
          if (!published) badge = <span className={`${styles.badge} ${styles.badgeLocked}`}>준비 중</span>
          else if (cleared) badge = <span className={`${styles.badge} ${styles.badgeCleared}`}>✓ CLEARED</span>
          else if (active) badge = <span className={`${styles.badge} ${styles.badgeActive}`}>▶ 진행중</span>
          else if (!unlocked) badge = <span className={`${styles.badge} ${styles.badgeLocked}`}>🔒 잠김</span>
          else badge = <span className={`${styles.badge} ${styles.badgeOpen}`}>도전 가능</span>

          return (
            <button
              type="button"
              disabled={!unlocked}
              key={h.id}
              data-hurdle={h.id}
              className={[
                styles.card,
                active ? styles.active : '',
                cleared ? styles.cleared : '',
                !unlocked ? styles.locked : ''
              ].join(' ')}
              onClick={() => unlocked && onSelect(h.id)}
            >
              <span className={styles.thumb}>
                <img
                  className={styles.thumbImg}
                  src={iconPath(h.id)}
                  alt={`HURDLE ${String(h.id).padStart(2, '0')} — ${h.title}`}
                  loading="lazy"
                />
                {!unlocked && (
                  <span className={styles.lockOverlay}>
                    <span className={styles.lockIcon}>🔒</span>
                    <span className={styles.lockText}>{published ? '잠김' : '준비 중'}</span>
                  </span>
                )}
              </span>

              <span className={styles.body}>
                <span className={styles.num}>HURDLE {String(h.id).padStart(2, '0')}</span>
                <span className={styles.title}>{h.title}</span>
                {h.sub && <span className={styles.sub}>{h.sub}</span>}
                {badge}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
