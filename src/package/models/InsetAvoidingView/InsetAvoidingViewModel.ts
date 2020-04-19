import { InsetSidebarConfig, LayoutConfig } from "../../types"
import { createFixedInsetSidebarEffect } from "../../effects/FixedInsetSidebar"
import { isFixedInsetSidebarConfig } from "../../utils/sidebarChecker"
import { MediaQueries } from "../../utils/createBreakpointStyles"
import {
  Breakpoint,
  Breakpoints,
} from "@material-ui/core/styles/createBreakpoints"

export default (
  { inset }: Pick<LayoutConfig, "inset">,
  breakpoints: Breakpoints
) => {
  let styles: MediaQueries = {}
  Object.entries(inset).forEach(
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
  return {
    styles,
  }
}
