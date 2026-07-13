import styles from './HurdleMap.module.css'

// 손그림풍 육상 허들 아이콘 — 썸네일 위 작은 배지로 사용 (기존 작업 계승)
function HurdleIcon({ cleared }) {
  return (
    <svg className={styles.icon} viewBox="0 0 64 44" aria-hidden="true">
      <path d="M10 6 C 9 18, 11 30, 9 40" fill="none" strokeWidth="3.5" strokeLinecap="round" className={styles.iconStroke} />
      <path d="M54 5 C 55 17, 53 29, 55 40" fill="none" strokeWidth="3.5" strokeLinecap="round" className={styles.iconStroke} />
      <path d="M6 14 C 22 12, 44 16, 58 13" fill="none" strokeWidth="3.5" strokeLinecap="round" className={styles.iconStroke} />
      <path d="M6 22 C 22 20, 44 24, 58 21" fill="none" strokeWidth="3.5" strokeLinecap="round" className={styles.iconStroke} />
      <path d="M6 30 C 22 28, 44 32, 58 29" fill="none" strokeWidth="3.5" strokeLinecap="round" className={styles.iconStroke} />
      {cleared && (
        <path d="M4 40 C 20 8, 44 8, 60 40" fill="none" strokeWidth="4" strokeLinecap="round" className={styles.iconJump} />
      )}
    </svg>
  )
}

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
              data-hurdle={h.id}
              className={[
                styles.card,
                active ? styles.active : '',
                cleared ? styles.cleared : '',
                !unlocked ? styles.locked : ''
              ].join(' ')}
              onClick={() => unlocked && onSelect(h.id)}
            >
              {/* 썸네일: 실제 이미지 준비되면 이 div의 background만 url(...)로 교체 */}
              <div className={styles.thumb}>
                <HurdleIcon cleared={cleared} />
                {!unlocked && (
                  <div className={styles.lockOverlay}>
                    <span className={styles.lockIcon}>🔒</span>
                    <span className={styles.lockText}>잠김</span>
                  </div>
                )}
              </div>

              <div className={styles.body}>
                <div className={styles.num}>HURDLE {String(h.id).padStart(2, '0')}</div>
                <div className={styles.title}>{h.title}</div>
                {h.sub && <div className={styles.sub}>{h.sub}</div>}
                {badge}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
