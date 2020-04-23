import {
  Breakpoint,
  Breakpoints,
} from "@material-ui/core/styles/createBreakpoints"
import { InsetSidebarConfig, InsetSidebarData } from "../types"
import { MediaQueries } from "../utils/createBreakpointStyles"
import { isFixedInsetSidebarConfig } from "../utils/sidebarChecker"
import { createFixedInsetSidebarEffect } from "../effects/FixedInsetSidebar"

export default (insetSidebar: Pick<InsetSidebarData, "configMap">) => {
  return {
    getMediaQueryStyle: (breakpoints: Breakpoints) => {
      let styles: MediaQueries = {}
      Object.entries(insetSidebar.configMap).forEach(
        ([bp, insetConfigs]: [Breakpoint, InsetSidebarConfig[]]) => {
          styles[bp] = {}
          insetConfigs.forEach(config => {
            if (isFixedInsetSidebarConfig(config)) {
              styles[bp] = {
                ...(styles[bp] as object),
                ...createFixedInsetSidebarEffect(config).getAvoidingStyle(),
              }
            }
          })
          styles[breakpoints.only(bp)] = styles[bp]
          delete styles[bp]
        }
      )
      return styles
    },
  }
}
