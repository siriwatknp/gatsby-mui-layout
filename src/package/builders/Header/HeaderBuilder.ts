import { pickNearestBreakpoint } from "../../utils"
import {
  HeaderConfig,
  HeaderConfigMap,
  IHeaderBuilder,
  IRegistry,
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
    getData: () => map,
    getConfig: () => map,
    getBreakpointConfig: function(breakpoint) {
      return pickNearestBreakpoint(map, breakpoint)
    },
  }
}
