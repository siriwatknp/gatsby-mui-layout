import {
  Breakpoint,
  Breakpoints,
  keys,
} from "@material-ui/core/styles/createBreakpoints"

export type BreakpointsObject = {
  [key: string]:
    | {
        [key: string]: number | string
      }
    | number
    | string
}

type cssObject = { [key: string]: number | string }
type Key = Breakpoint | string
type Value = cssObject | string | number

export default (
  breakpointsObject: BreakpointsObject,
  breakpoints: Breakpoints
) => {
  const entries = Object.entries(breakpointsObject)
  let mediaQueries: { [key: string]: Value } = {}
  entries.forEach(([key, value]: [Key, Value]) => {
    if (typeof value === "object") {
      if (key === "xs") {
        mediaQueries = { ...mediaQueries, ...value }
      }
      if (key !== "xs" && keys.includes(<Breakpoint>key)) {
        mediaQueries[breakpoints.up(<Breakpoint>key)] = value
      }
    } else {
      mediaQueries[key] = value
    }
  })

  return mediaQueries
}
