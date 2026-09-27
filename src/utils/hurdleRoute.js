export const hurdlePath = id => `/hurdles/${id}`

export function hurdleIdFromPath(pathname) {
  const match = /^\/hurdles\/(\d+)\/?$/.exec(pathname)
  return match ? Number(match[1]) : null
}
