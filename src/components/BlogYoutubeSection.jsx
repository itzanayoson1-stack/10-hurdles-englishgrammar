import styles from './BlogYoutubeSection.module.css'

// Titles verified against YouTube oEmbed and Naver page metadata.
const PICKS = [
  { type: 'video', href: 'https://youtu.be/Q0jDiryJnfQ', id: 'Q0jDiryJnfQ', label: 'WATCH / 01', title: '토익 리스닝, 이 순서로 딱 10세트만 했습니다. (LC 파트 3 & 4 완벽공략법)', action: '유튜브에서 보기 ↗' },
  { type: 'video', href: 'https://youtu.be/lznfyQZkqHg', id: 'lznfyQZkqHg', label: 'WATCH / 02', title: '분사 하나 이해했을 뿐인데… 영어가 이렇게 보입니다', action: '유튜브에서 보기 ↗' },
  { type: 'blog', href: 'https://blog.naver.com/cheaperenglish/224315565029', label: 'READ / 01', title: '나는 여전히 짧은 머리가 좋다. (2026년 Ver.)', action: '블로그에서 읽기 ↗', word: 'perspective.' },
  { type: 'blog', href: 'https://blog.naver.com/cheaperenglish/224319662410', label: 'READ / 02', title: '영어 독해를 잘 하는 사람들의 공통점 (토익 900점 이후 알게 된 사실)', action: '블로그에서 읽기 ↗', word: 'practice.' },
]

export default function BlogYoutubeSection() {
  return (
    <section className={styles.wrap} aria-labelledby="featured-heading">
      <div className={styles.heading}>
        <div><span className={styles.eyebrow}>UK TIGER PICKS</span><h2 id="featured-heading">영상으로 보고, 글로 만나요.</h2></div>
        <p>추천 영상 2편 · 블로그 2편</p>
      </div>
      <div className={styles.grid}>
        {PICKS.map(p => (
          <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className={styles.card} aria-label={p.title + ' — 새 탭에서 열기'}>
            {p.type === 'video' ? (
              <div className={styles.media}>
                <img src={`https://i.ytimg.com/vi/${p.id}/hqdefault.jpg`} alt="" loading="lazy" width="480" height="360" />
                <span className={styles.play} aria-hidden="true">▶</span>
                <span className={styles.platform}>YOUTUBE</span>
              </div>
            ) : (
              <div className={styles.paper} aria-hidden="true"><span>the coach’s notes</span><strong>{p.word}</strong><span className={styles.noteArrow}>↗</span></div>
            )}
            <div className={styles.body}><span className={styles.label}>{p.label}</span><h3>{p.title}</h3><span className={styles.action}>{p.action}</span></div>
          </a>
        ))}
      </div>
    </section>
  )
}
