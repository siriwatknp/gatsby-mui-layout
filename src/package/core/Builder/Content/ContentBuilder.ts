import createListEffect from "../../../effects/SidebarList/SidebarListEffect"
import { IContentBuilder, ResultStyle } from "../../../types"

import { sortBreakpoints } from "../../../utils/createHiddenStyles"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"

export default (): IContentBuilder => {
  let id: string
  return {
    create: function(contentId: string) {
      id = contentId
    },
    getResultStyle(state, sidebar) {
      const result: ResultStyle = {}
      const breakpoints = sortBreakpoints(
        Object.keys(sidebar.getConfig()) as Breakpoint[]
      )
      sidebar.iterateBreakpointEffects(state, breakpoints, (bp, effects) => {
        const { marginStyle, widthStyle } = createListEffect(effects, id)
        result[bp] = { ...widthStyle, ...marginStyle }
      })
      return result
    },
  }
}
