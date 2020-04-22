import { pickNearestBreakpoint, combineBreakpoints } from "../../utils"
import createHeaderModel from "../../models/Header"
import createHeaderEffect from "../../effects/Header"
import {
  HeaderConfig,
  HeaderConfigMap,
  IHeaderBuilder,
  IRegistry,
  ResultStyle,
} from "../../types"

export default (): IHeaderBuilder => {
  const map: HeaderConfigMap = {}

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
      sidebar.iterateBreakpointEffects(state, breakpoints, (bp, effects) => {
        const headerConfig = this.getBreakpointConfig(bp)
        if (!headerConfig) {
          throw new Error(
            `Cannot find HeaderConfig at breakpoint: ${bp}, please provide config at least on "xs" breakpoint`
          )
        }

        result[bp] = createHeaderModel(headerConfig, effects).getStyle()
      })
      return result
    },
  }
}
