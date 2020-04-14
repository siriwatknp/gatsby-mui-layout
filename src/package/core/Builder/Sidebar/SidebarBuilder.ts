import { createPersistentSidebarEffect } from "../../../models/PersistentSidebar"
import { pickNearestBreakpoint } from "../../../utils"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import {
  SidebarConfig,
  MapBreakpoint,
  ISidebarEffectCreator,
  ISidebarStateEffectCreator,
  ISidebarBuilder,
  ISidebarRegistry,
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

const createStateEffect = (
  effectCreator: ISidebarEffectCreator,
  config: SidebarConfig
): ISidebarStateEffectCreator => map => effectCreator(config, map)

export default (): ISidebarBuilder => {
  const sidebarIds: string[] = []
  const map: MapBreakpoint<SidebarConfig[]> = {}
  const effect: MapBreakpoint<ISidebarStateEffectCreator[]> = {}
  const addConfig = (
    breakpoint: Breakpoint,
    config: SidebarConfig,
    effectCreator: ISidebarEffectCreator
  ): void => {
    if (!sidebarIds.includes(config.id)) {
      sidebarIds.push(config.id)
    }

    if (!map[breakpoint]) {
      map[breakpoint] = []
    }
    map[breakpoint].push(config)

    if (!effect[breakpoint]) {
      effect[breakpoint] = []
    }
    effect[breakpoint].push(createStateEffect(effectCreator, config))

    if (!isUniqueSidebars(map[breakpoint])) {
      throw new Error(
        `Sidebar id: ${config.id} is duplicated at breakpoint "${breakpoint}"`
      )
    }
  }
  return {
    create: function(id: string) {
      const Registry = (): ISidebarRegistry => ({
        registerPersistentSidebarConfig(breakpoint, config) {
          addConfig(
            breakpoint,
            { ...config, id },
            createPersistentSidebarEffect
          )
          return this
        },
        registerTemporarySidebarConfig(breakpoint, config) {
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
    getConfig: () => map,
    getBreakpointConfig: breakpoint => pickNearestBreakpoint(map, breakpoint),
    getBreakpointEffect: breakpoint =>
      pickNearestBreakpoint(effect, breakpoint),
    getResultStyle: () => ({}),
  }
}
