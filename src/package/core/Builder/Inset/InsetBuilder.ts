import {
  AbsoluteInsetSidebarConfig,
  Dictionary,
  FixedInsetSidebarConfig,
  InsetSidebarConfig,
  InsetSidebarResultStyle,
  MapBreakpoint,
  ResultStyle,
  StickyInsetSidebarConfig,
} from "../../../types"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import { pickNearestBreakpoint } from "../../../utils"
import {
  isAbsoluteInsetSidebarConfig,
  isFixedInsetSidebarConfig,
  isStickyInsetSidebarConfig,
} from "../../../utils/sidebarChecker"
import AbsoluteInset from "../../../models/Sidebar/Inset/AbsoluteInset"
import StickyInset from "../../../models/Sidebar/Inset/StickyInset"
import FixedInset from "../../../models/Sidebar/Inset/FixedInset"

export interface IInsetSidebarRegistry {
  registerStickyConfig: (
    breakpoint: Breakpoint,
    config: Omit<StickyInsetSidebarConfig, "id" | "variant">
  ) => IInsetSidebarRegistry
  registerAbsoluteConfig: (
    breakpoint: Breakpoint,
    config: Omit<AbsoluteInsetSidebarConfig, "id" | "variant">
  ) => IInsetSidebarRegistry
  registerFixedConfig: (
    breakpoint: Breakpoint,
    config: Omit<FixedInsetSidebarConfig, "id" | "variant">
  ) => IInsetSidebarRegistry
}

export interface IInsetBuilder {
  createSidebar: (id: string) => IInsetSidebarRegistry
  getConfig: () => InsetSidebarConfigMap
  getResultStyle: () => Dictionary<InsetSidebarResultStyle>
}

export type InsetSidebarConfigMap = MapBreakpoint<InsetSidebarConfig[]>
export type InsetSidebarConfigMapById = Dictionary<
  MapBreakpoint<InsetSidebarConfig>
>

export default (): IInsetBuilder => {
  const mapByBreakpoints: InsetSidebarConfigMap = {}
  const mapById: InsetSidebarConfigMapById = {}
  const addConfig = (bp: Breakpoint, config: InsetSidebarConfig): void => {
    if (!mapByBreakpoints[bp]) {
      mapByBreakpoints[bp] = []
    }
    mapByBreakpoints[bp].push(config)

    if (!mapById[config.id]) {
      mapById[config.id] = {}
    }
    mapById[config.id][bp] = config
  }
  return {
    createSidebar(id: string) {
      // InsetSidebar can be multiples, id is needed
      const Registry = (): IInsetSidebarRegistry => ({
        registerStickyConfig(breakpoint, config) {
          addConfig(breakpoint, { ...config, id, variant: "sticky" })
          return this
        },
        registerAbsoluteConfig(breakpoint, config) {
          addConfig(breakpoint, { ...config, id, variant: "absolute" })
          return this
        },
        registerFixedConfig(breakpoint, config) {
          addConfig(breakpoint, { ...config, id, variant: "fixed" })
          return this
        },
      })
      return Registry()
    },
    getConfig: () => mapByBreakpoints,
    getResultStyle() {
      const result: Dictionary<InsetSidebarResultStyle> = {}
      Object.entries(mapById).forEach(([sidebarId, breakpointConfigMap]) => {
        result[sidebarId] = { root: {}, body: {} }

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

            result[sidebarId].root[bp] = model.getRootStyle()
            result[sidebarId].body[bp] = model.getBodyStyle()
          }
        })
      })
      return result
    },
  }
}
