import {
  InsetSidebarConfig,
  InsetSidebarData,
  InsetSidebarResultStyle,
} from "../types"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import { pickNearestBreakpoint } from "../utils"
import {
  isAbsoluteInsetSidebarConfig,
  isFixedInsetSidebarConfig,
  isStickyInsetSidebarConfig,
} from "../utils/sidebarChecker"
import StickyInset from "../models/Sidebar/Inset/StickyInset"
import AbsoluteInset from "../models/Sidebar/Inset/AbsoluteInset"
import FixedInset from "../models/Sidebar/Inset/FixedInset"

export default (insetSidebar: Pick<InsetSidebarData, "configMapById">) => {
  return {
    getVariant: (sidebarId: string): string => {
      const config = pickNearestBreakpoint(
        insetSidebar.configMapById[sidebarId],
        "xl"
      )
      return config.variant
    },
    getResultStyle: (sidebarId: string): InsetSidebarResultStyle => {
      const result: InsetSidebarResultStyle = { root: {}, body: {} }
      const breakpointConfigMap = insetSidebar.configMapById[sidebarId]
      const breakpoints = Object.keys(breakpointConfigMap)
      breakpoints.forEach((bp: Breakpoint) => {
        const config: InsetSidebarConfig = pickNearestBreakpoint(
          breakpointConfigMap,
          bp
        )
        if (config) {
          let model: { getRootStyle: () => {}; getBodyStyle: () => {} }
          if (isStickyInsetSidebarConfig(config)) {
            model = StickyInset(config)
          } else if (isAbsoluteInsetSidebarConfig(config)) {
            model = AbsoluteInset(config)
          } else if (isFixedInsetSidebarConfig(config)) {
            model = FixedInset(config)
          }

          result.root[bp] = model.getRootStyle()
          result.body[bp] = model.getBodyStyle()
        }
      })
      return result
    },
  }
}
