import {
  Breakpoint,
  Breakpoints,
  keys,
} from "@material-ui/core/styles/createBreakpoints"
import { MediaQueries } from "./createBreakpointStyles"
import { ResultStyle } from "../types"

interface CreateHiddenStyles {
  (
    self?: ResultStyle,
    siblings?: ResultStyle[],
    breakpoints?: Breakpoints
  ): MediaQueries
}

export const sortBreakpoints = (breakpoints: Breakpoint[]) =>
  breakpoints.sort((a, b) => keys.indexOf(a) - keys.indexOf(b))

export const getVisibleRange = (breakpoints: Breakpoint[]) =>
  keys.slice(
    keys.indexOf(breakpoints[0]),
    keys.indexOf(breakpoints.reverse()[0]) + 1
  )

export const getBreakpointBelow = (bp: Breakpoint) => keys[keys.indexOf(bp) - 1]

export const getBreakpointUpper = (bp: Breakpoint) => keys[keys.indexOf(bp) + 1]

export const getSiblingsRange = (siblings: ResultStyle[]) =>
  siblings.reduce((result, curr) => [...result, ...Object.keys(curr)], [])

export const getVisibleRangeFromSiblings = (
  self: ResultStyle,
  siblings: ResultStyle[]
) => {
  let selfBreakpoints = sortBreakpoints(Object.keys(self) as Breakpoint[])
  if (!siblings || !siblings.length) {
    return getVisibleRange([...selfBreakpoints, "xl"])
  }
  const highestBreakpoint = sortBreakpoints(
    getSiblingsRange(siblings)
  ).reverse()[0]
  if (
    keys.indexOf(highestBreakpoint) > keys.indexOf(selfBreakpoints.reverse()[0])
  ) {
    selfBreakpoints = [
      ...selfBreakpoints,
      getBreakpointBelow(highestBreakpoint),
    ]
  }
  return getVisibleRange(sortBreakpoints(selfBreakpoints))
}

const createHiddenStyles: CreateHiddenStyles = (
  self,
  siblings = [],
  breakpoints
) => {
  if (!self || !breakpoints) return {}
  const result: MediaQueries = {}
  const visibleRange = getVisibleRangeFromSiblings(self, siblings)

  visibleRange.forEach((breakpoint, index) => {
    if (index === 0) {
      if (breakpoint !== "xs") {
        result[breakpoints.down(getBreakpointBelow(breakpoint))] = {
          display: "none",
        }
      }
    } else if (index === visibleRange.length - 1) {
      if (breakpoint !== "xl") {
        result[breakpoints.up(getBreakpointUpper(breakpoint))] = {
          display: "none",
        }
      }
    } else {
      if (siblings.some(sibling => Object.keys(sibling).includes(breakpoint))) {
        result[breakpoints.only(breakpoint)] = {
          display: "none",
        }
      }
    }
  })

  return result
}

export default createHiddenStyles
