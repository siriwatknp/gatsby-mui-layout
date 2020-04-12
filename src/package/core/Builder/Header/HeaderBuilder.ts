import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import { pickNearestBreakpoint } from "../../../utils"
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
    getResultStyle: (state, sidebar) => {
      const result: ResultStyle = {}
      Object.entries(map).forEach(
        ([breakpoint, config]: [Breakpoint, HeaderConfig]) => {
          const stateEffectCreators = sidebar.getBreakpointEffects(breakpoint)
          const effects = stateEffectCreators.map(c => c(state))
          result[breakpoint] = createHeaderModel(config, effects).getStyle()
        }
      )
      return result
    },
  }
}
