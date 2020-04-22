import { createSidebarListEffect } from "../../effects/SidebarList"
import { IFooterBuilder, ResultStyle } from "../../types"

import { sortBreakpoints } from "../../utils/createHiddenStyles"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"

export default (): IFooterBuilder => {
  let id: string
  return {
    create: function(footerId: string) {
      id = footerId
    },
    getResultStyle(state, sidebar) {
      const result: ResultStyle = {}
      const breakpoints = sortBreakpoints(
        Object.keys(sidebar.getConfig()) as Breakpoint[]
      )
      sidebar.iterateBreakpointEffects(state, breakpoints, (bp, effects) => {
        const { marginStyle, widthStyle } = createSidebarListEffect(effects, id)
        result[bp] = { ...widthStyle, ...marginStyle }
      })
      return result
    },
  }
}
