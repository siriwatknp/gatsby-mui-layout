import {
  AbsoluteInsetSidebarConfig,
  Dictionary,
  FixedInsetSidebarConfig,
  InsetSidebarConfig, InsetSidebarData,
  MapBreakpoint,
  StickyInsetSidebarConfig,
} from "../../types"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"

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

export interface IInsetSidebarBuilder {
  create: (id: string) => IInsetSidebarRegistry
  getData: () => InsetSidebarData
  getConfig: () => InsetSidebarConfigMap
}

export type InsetSidebarConfigMap = MapBreakpoint<InsetSidebarConfig[]>
export type InsetSidebarConfigMapById = Dictionary<
  MapBreakpoint<InsetSidebarConfig>
>

export default (): IInsetSidebarBuilder => {
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
    create(id: string) {
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
    getData: () => ({
      configMapById: mapById,
      configMap: mapByBreakpoints
    }),
    getConfig: () => mapByBreakpoints,
  }
}
