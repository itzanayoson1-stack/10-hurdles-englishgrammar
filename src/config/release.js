export const PUBLISHED_HURDLE_IDS = [1, 2, 3]
export const isPublished = id => PUBLISHED_HURDLE_IDS.includes(id)
export const canOpen = (id, cleared) => isPublished(id) &&
  (id === PUBLISHED_HURDLE_IDS[0] || cleared.includes(id) || cleared.includes(id - 1))
export const nextPublished = id => PUBLISHED_HURDLE_IDS[PUBLISHED_HURDLE_IDS.indexOf(id) + 1] ?? null
