import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import { pickNearestBreakpoint, combineBreakpoints } from "../../../utils"
import createHeaderModel, { createHeaderEffect } from "../../../models/Header"
import {
  HeaderConfig,
  IHeaderBuilder,
  MapBreakpoint,
  ResultStyle,
} from "../../../types"

export default (initialConfig?: HeaderConfig): IHeaderBuilder => {
  const map: MapBreakpoint<HeaderConfig> = {}
  if (initialConfig) {
    map.xs = initialConfig
  }
  return {
    createConfig: function(breakpoint, config) {
      map[breakpoint] = config
    },
    getConfig: () => map,
    getBreakpointConfig: function(breakpoint) {
      return pickNearestBreakpoint(map, breakpoint)
    },
    getBreakpointEffect: function(breakpoint) {
      return createHeaderEffect(this.getBreakpointConfig(breakpoint))
    },
    getResultStyle(state, sidebar) {
      const result: ResultStyle = {}
      const breakpoints = combineBreakpoints(map, sidebar.getConfig())
      breakpoints.map(bp => {
        const headerConfig = this.getBreakpointConfig(bp);
        const stateEffectCreators = sidebar.getBreakpointEffects(bp)
        if (stateEffectCreators) {
          const effects = stateEffectCreators.map(c => c(state))
          result[bp] = createHeaderModel(headerConfig, effects).getStyle()
        }
      })
      return result
    },
  }
}
