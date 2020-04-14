import createEdgeSidebarModel from "../../../models/Sidebar/Edge"
import { createPersistentSidebarEffect } from "../../../effects/PersistentSidebar"
import { combineBreakpoints, pickNearestBreakpoint } from "../../../utils"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import {
  SidebarConfig,
  MapBreakpoint,
  ISidebarEffectCreator,
  ISidebarStateEffectCreator,
  ISidebarBuilder,
  IEdgeSidebarRegistry,
  SidebarResultStyle,
  Dictionary,
  EdgeSidebarConfig,
} from "../../../types"

export const isUniqueSidebars = (sidebars: SidebarConfig[]): boolean => {
  const keys: string[] = []
  let isUnique = true
  sidebars.forEach(({ id }) => {
    if (!id) {
      throw new Error("[Layout] - All Sidebar must have id")
    }
    if (keys.includes(id)) {
      isUnique = false
    } else {
      keys.push(id)
    }
  })
  return isUnique
}

const isEdgeSidebarConfig = (
  config: SidebarConfig
): config is EdgeSidebarConfig => {
  return typeof (config as EdgeSidebarConfig).collapsible === "boolean"
}

const createStateEffect = (
  effectCreator: ISidebarEffectCreator,
  config: SidebarConfig
): ISidebarStateEffectCreator => mapByBreakpoint =>
  effectCreator(config, mapByBreakpoint)

export default (): ISidebarBuilder => {
  const sidebarIds: string[] = []
  const mapByBreakpoint: MapBreakpoint<SidebarConfig[]> = {}
  const mapById: Dictionary<MapBreakpoint<SidebarConfig>> = {}
  const effect: MapBreakpoint<ISidebarStateEffectCreator[]> = {}
  const addConfig = (
    breakpoint: Breakpoint,
    config: SidebarConfig,
    effectCreator: ISidebarEffectCreator
  ): void => {
    if (!sidebarIds.includes(config.id)) {
      sidebarIds.push(config.id)
    }

    if (!mapByBreakpoint[breakpoint]) {
      mapByBreakpoint[breakpoint] = []
    }
    // todo: this can be inconsistent
    // sidebar {id} can have duplicate "xs" config
    mapByBreakpoint[breakpoint].push(config)
    if (!mapById[config.id]) {
      mapById[config.id] = {}
    }
    mapById[config.id][breakpoint] = config

    if (!effect[breakpoint]) {
      effect[breakpoint] = []
    }
    effect[breakpoint].push(createStateEffect(effectCreator, config))

    if (!isUniqueSidebars(mapByBreakpoint[breakpoint])) {
      throw new Error(
        `Sidebar id: ${config.id} is duplicated at breakpoint "${breakpoint}"`
      )
    }
  }
  return {
    createEdgeSidebar: function(id: string) {
      const Registry = (): IEdgeSidebarRegistry => ({
        registerPersistentConfig(breakpoint, config) {
          addConfig(
            breakpoint,
            { ...config, id },
            createPersistentSidebarEffect
          )
          return this
        },
      })
      return Registry()
    },
    getSidebarIds: () => sidebarIds,
    getConfig: () => mapByBreakpoint,
    getBreakpointConfig: breakpoint =>
      pickNearestBreakpoint(mapByBreakpoint, breakpoint),
    getBreakpointEffect: breakpoint =>
      pickNearestBreakpoint(effect, breakpoint),
    getResultStyle(state, header) {
      const result: SidebarResultStyle = {}

      Object.entries(mapById).forEach(([sidebarId, breakpointConfigMap]) => {
        result[sidebarId] = {}
        const breakpoints = combineBreakpoints(
          breakpointConfigMap,
          header.getConfig()
        )
        breakpoints.forEach(bp => {
          const config: SidebarConfig = pickNearestBreakpoint(
            breakpointConfigMap,
            bp
          )
          const headerEffect = header.getBreakpointEffect(bp)
          if (isEdgeSidebarConfig(config) && headerEffect) {
            result[sidebarId][bp] = {
              ...createEdgeSidebarModel(config, state),
              ...headerEffect.getEdgeSidebarZIndex(sidebarId),
            }
          }
        })
      })
      return result
    },
  }
}
