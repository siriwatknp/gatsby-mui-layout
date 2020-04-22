import HeaderEffect from "../effects/Header"
import {
  EdgeSidebarConfig,
  EdgeSidebarData,
  HeaderConfigMap,
  SidebarResultStyle,
  State,
} from "../types"
import { combineBreakpoints, pickNearestBreakpoint } from "../utils"
import {
  isPermanentSidebarConfig,
  isPersistentSidebarConfig,
  isTemporarySidebarConfig,
} from "../utils/sidebarChecker"
import createEdgeSidebarModel from "../models/Sidebar/Edge/EdgeSidebarModel"

export default (
  state: State,
  edgeSidebar: Pick<EdgeSidebarData, "configMapById">,
  header: HeaderConfigMap
) => {
  return {
    getResultStyle: (): SidebarResultStyle => {
      const result: SidebarResultStyle = {}
      Object.entries(edgeSidebar.configMapById).forEach(
        ([sidebarId, configMap]) => {
          result[sidebarId] = {
            persistent: {},
            permanent: {},
            temporary: {},
          }

          const breakpoints = combineBreakpoints(configMap, header)

          breakpoints.forEach(bp => {
            const config: EdgeSidebarConfig = pickNearestBreakpoint(
              configMap,
              bp
            )
            if (config) {
              const headerEffect = HeaderEffect(
                pickNearestBreakpoint(header, bp)
              )
              if (isPersistentSidebarConfig(config) && headerEffect) {
                result[sidebarId].persistent[bp] = {
                  ...createEdgeSidebarModel(config, state),
                  ...headerEffect.getEdgeSidebarZIndex(sidebarId),
                }
              } else if (isPermanentSidebarConfig(config) && headerEffect) {
                result[sidebarId].permanent[bp] = {
                  ...createEdgeSidebarModel(config, state),
                  ...headerEffect.getEdgeSidebarZIndex(sidebarId),
                }
              } else if (isTemporarySidebarConfig(config)) {
                result[sidebarId].temporary[bp] = {
                  width: config.width,
                }
              }
            }
          })
        }
      )
      return result
    },
  }
}
