import { EdgeSidebarData } from "../types"
import { Breakpoint, keys } from "@material-ui/core/styles/createBreakpoints"
import { isCollapsibleSidebarConfig } from "../utils/sidebarChecker"

export default (edgeSidebar: Pick<EdgeSidebarData, "configMapById">) => {
  return {
    getHiddenBreakpoints: (sidebarId: string) => {
      const result: Breakpoint[] = []
      let found: boolean = false
      keys.forEach(bp => {
        const config = edgeSidebar.configMapById[sidebarId][bp]
        if (isCollapsibleSidebarConfig(config)) {
          found = true
        } else if (config || (!config && !found)) {
          result.push(bp)
          found = false
        }
      })
      return result
    },
  }
}
