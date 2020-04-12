import { createPersistentSidebarEffect } from "../../../models/PersistentSidebar"
import { pickNearestBreakpoint } from "../../../utils"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import {
  SidebarConfig,
  MapBreakpoint,
  ISidebarEffectCreator,
  ISidebarStateEffectCreator,
  ISidebarBuilder,
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
): ISidebarStateEffectCreator => state => effectCreator(config, state)

export default (): ISidebarBuilder => {
  const state: MapBreakpoint<SidebarConfig[]> = {}
  const effect: MapBreakpoint<ISidebarStateEffectCreator[]> = {}
  const addConfig = (
    breakpoint: Breakpoint,
    config: SidebarConfig,
    effectCreator: ISidebarEffectCreator
  ): void => {
    if (!state[breakpoint]) {
      state[breakpoint] = []
    }
    state[breakpoint].push(config)

    if (!effect[breakpoint]) {
      effect[breakpoint] = []
    }
    effect[breakpoint].push(createStateEffect(effectCreator, config))

    if (!isUniqueSidebars(state[breakpoint])) {
      throw new Error(
        `Sidebar id: ${config.id} is duplicated at breakpoint "${breakpoint}"`
      )
    }
  }
  return {
    createPersistentSidebarConfig: function(breakpoint, config) {
      addConfig(breakpoint, config, createPersistentSidebarEffect)
    },
    createTemporarySidebarConfig: function(breakpoint, config) {
      // todo: change effect creator to createTemporarySidebarEffect
      addConfig(breakpoint, config, createPersistentSidebarEffect)
    },
    getConfig: () => state,
    getBreakpointConfig: breakpoint => pickNearestBreakpoint(state, breakpoint),
    getBreakpointEffects: breakpoint =>
      pickNearestBreakpoint(effect, breakpoint),
  }
}
