import HeaderEffect from "../effects/Header"
import { EdgeSidebarData, HeaderConfigMap, ResultStyle } from "../types"
import { combineBreakpoints, pickNearestBreakpoint } from "../utils"

export default (
  edgeSidebar: Pick<EdgeSidebarData, "configMapById">,
  header: HeaderConfigMap
) => {
  return {
    getResultStyle: (sidebarId: string) => {
      const result: ResultStyle = {}
      let found: boolean = false
      const configMap = edgeSidebar.configMapById[sidebarId]
      if (configMap) {
        const breakpoints = combineBreakpoints(configMap, header)
        breakpoints.forEach(bp => {
          const config = pickNearestBreakpoint(configMap, bp)
          if (config) {
            if (
              header[bp] &&
              HeaderEffect(header[bp]).isObjectClipped(sidebarId)
            ) {
              found = true
              result[bp] = {
                height: pickNearestBreakpoint(header, bp).initialHeight,
              }
            } else if (found) {
              found = false
              result[bp] = {
                height: 0,
              }
            }
          }
        })
      }
      return result
    },
  }
}
