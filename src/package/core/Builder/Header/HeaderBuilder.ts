import { pickNearestBreakpoint, combineBreakpoints } from "../../../utils"
import createHeaderModel from "../../../models/Header"
import createHeaderEffect from "../../../effects/Header"
import {
  HeaderConfig,
  IHeaderBuilder,
  IRegistry,
  MapBreakpoint,
  ResultStyle,
} from "../../../types"

export default (): IHeaderBuilder => {
  const map: MapBreakpoint<HeaderConfig> = {}

  return {
    create: function(id: string) {
      const Registry = (): IRegistry<HeaderConfig> => ({
        registerConfig(breakpoint, config) {
          map[breakpoint] = { ...config, id }
          return this
        },
      })
      return Registry()
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
        const headerConfig = this.getBreakpointConfig(bp)
        if (!headerConfig) {
          throw new Error(
            `Cannot find HeaderConfig at breakpoint: ${bp}, please provide config at least on "xs" breakpoint`
          )
        }

        const stateEffectCreators = sidebar.getBreakpointEffect(bp)
        if (stateEffectCreators) {
          const effects = stateEffectCreators.map(c => c(state))
          result[bp] = createHeaderModel(headerConfig, effects).getStyle()
        }
      })
      return result
    },
  }
}
