import styles from './BlogYoutubeSection.module.css'

// ================================================================
// 홈 화면 — 블로그 & 유튜브 섹션
// 구조는 ncase.me의 "SHTUFF YOU CAN PLAY/READ/WATCH" 카드 그리드를
// 참고했지만, 비주얼은 tenhurdles의 기존 정체성(화이트+코랄+굵은
// 산세리프)을 그대로 유지. 손그림 마스코트 대신 작은 손글씨 포인트
// (라벨 폰트, 동그라미 낙서 SVG)만 절제해서 사용.
//
// ⚠️ 제목/설명은 임시 텍스트입니다. 정확한 글 제목으로 교체해 주세요.
// (Naver 블로그·유튜브 페이지를 직접 읽어올 수 없어 URL만으로 채웠습니다.)
// ================================================================

const BLOG_POSTS = [
  {
    href: 'https://blog.naver.com/cheaperenglish/224315565029',
    tag: '나의 이야기',
    title: '[제목 확인 필요] 나의 정체성을 보여주는 글',
    desc: 'UK Tiger가 어떤 코치인지, 왜 이 길을 걷게 됐는지에 대한 이야기',
  },
  {
    href: 'https://blog.naver.com/cheaperenglish/224319662410',
    tag: '토익',
    title: '[제목 확인 필요] 토익 공부법',
    desc: '효율적으로 점수를 올리는 토익 학습 전략',
  },
  {
    href: 'https://blog.naver.com/cheaperenglish/222292100546',
    tag: '문법',
    title: '[제목 확인 필요] 영어 문법 이야기',
    desc: '문법을 바라보는 관점에 대한 글',
  },
]

const YT_VIDEOS = [
  {
    href: 'https://youtu.be/Q0jDiryJnfQ',
    id: 'Q0jDiryJnfQ',
    tag: '대표 영상',
    title: '[제목 확인 필요] 토익 LC 공부법',
  },
  {
    href: 'https://youtu.be/lznfyQZkqHg',
    id: 'lznfyQZkqHg',
    tag: '문법 영상',
    title: '[제목 확인 필요] 영어 문법 — 분사',
  },
]

function DoodleCircle() {
  // 손글씨풍 동그라미 낙서 — 섹션 라벨 강조용, 절제된 사용
  return (
    <svg className={styles.doodle} viewBox="0 0 120 40" aria-hidden="true">
      <path
        d="M8 22 C 4 10, 30 3, 60 4 C 95 5, 116 12, 112 22 C 108 34, 70 38, 40 36 C 15 34, 4 30, 8 22 Z"
        fill="none"
        stroke="#FF4A5A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function BlogYoutubeSection() {
  return (
    <div className={styles.wrap}>
      {/* ---------- 블로그 ---------- */}
      <section className={styles.section}>
        <div className={styles.labelRow}>
          <span className={styles.hand}>코치의 기록</span>
          <h2 className={styles.title}>블로그</h2>
        </div>

        <div className={styles.blogGrid}>
          {BLOG_POSTS.map(p => (
            <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className={styles.blogCard}>
              <span className={styles.blogTag}>{p.tag}</span>
              <div className={styles.blogTitle}>{p.title}</div>
              <div className={styles.blogDesc}>{p.desc}</div>
              <span className={styles.blogArrow}>더 읽기 →</span>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- 유튜브 ---------- */}
      <section className={styles.section}>
        <div className={styles.labelRow}>
          <DoodleCircle />
          <h2 className={styles.title}>유튜브</h2>
        </div>

        <div className={styles.ytGrid}>
          {YT_VIDEOS.map(v => (
            <a key={v.href} href={v.href} target="_blank" rel="noopener noreferrer" className={styles.ytCard}>
              <div className={styles.ytThumbWrap}>
                <img
                  className={styles.ytThumb}
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                />
                <span className={styles.ytPlay}>▶</span>
              </div>
              <span className={styles.ytTag}>{v.tag}</span>
              <div className={styles.ytTitle}>{v.title}</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
