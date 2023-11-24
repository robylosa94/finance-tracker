import { Route } from "next"

export const homeUrl = (): Route => {
  return `/`
}

export const movesUrl = (): Route => {
  return `/movimenti`
}

export const tagUrl = (): Route => {
  return `/tag`
}
