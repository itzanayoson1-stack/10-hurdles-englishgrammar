// 허들 + 레벨 조합별로 "이미 출제된 문제 인덱스"를 localStorage에 저장해두고,
// 다음에 같은 허들을 다시 풀 때 안 겹치는 문제를 우선 뽑아준다.
// 안 본 문제가 목표 개수보다 적으면, 그만큼은 채우되 나머지는 (예전에 봤던 문제 중에서)
// 새로 무작위로 채워 넣고 사이클을 처음부터 다시 시작한다.

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function seenKey(level, hurdleId) {
  return `thq_seen:${level}:${hurdleId}`
}

function readSeen(level, hurdleId, poolSize) {
  try {
    const raw = localStorage.getItem(seenKey(level, hurdleId))
    const parsed = raw ? JSON.parse(raw) : []
    if (!Array.isArray(parsed)) return []
    return parsed.filter(i => Number.isInteger(i) && i >= 0 && i < poolSize)
  } catch {
    return []
  }
}

function writeSeen(level, hurdleId, indices) {
  try {
    localStorage.setItem(seenKey(level, hurdleId), JSON.stringify(indices))
  } catch {
    // localStorage 사용 불가 환경이면 저장만 조용히 건너뛴다 (랜덤 출제 자체는 계속 동작)
  }
}

// 풀 크기(poolSize) 안에서 target개의 인덱스를 안 겹치게 뽑는다.
// 안 본 문제가 부족하면 예전에 봤던 문제로 채우고, 그 순간부터 새 사이클을 시작한다.
export function pickQuizIndices(level, hurdleId, poolSize, target = 8) {
  if (poolSize <= 0) return []

  const targetCount = Math.min(target, poolSize)
  const allIndices = Array.from({ length: poolSize }, (_, i) => i)
  const seen = readSeen(level, hurdleId, poolSize)
  const unseen = allIndices.filter(i => !seen.includes(i))

  let drawn
  let nextSeen

  if (unseen.length >= targetCount) {
    drawn = shuffle(unseen).slice(0, targetCount)
    nextSeen = [...seen, ...drawn]
  } else {
    const remainingNeeded = targetCount - unseen.length
    const fresh = shuffle(seen).slice(0, remainingNeeded)
    drawn = shuffle([...unseen, ...fresh])
    nextSeen = [...drawn] // 새 사이클 시작: 이번에 뽑은 것만 "본 문제"로 다시 기록
  }

  writeSeen(level, hurdleId, nextSeen)
  return drawn
}

// 위 인덱스를 실제 quizzes 배열에서 뽑아 객체로 반환하는 편의 함수
export function pickQuizzes(level, hurdleId, quizzesPool, target = 8) {
  const indices = pickQuizIndices(level, hurdleId, quizzesPool.length, target)
  return indices.map(i => quizzesPool[i])
}
