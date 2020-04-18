import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import createEdgeSidebarModel from "../../../models/Sidebar/Edge"
import { createPersistentSidebarEffect } from "../../../effects/PersistentSidebar"
import { createPermanentSidebarEffect } from "../../../effects/PermanentSidebar"
import { combineBreakpoints, pickNearestBreakpoint } from "../../../utils"
import {
  isPermanentSidebarConfig,
  isPersistentSidebarConfig,
  isTemporarySidebarConfig,
} from "../../../utils/sidebarChecker"
import {
  SidebarConfig,
  MapBreakpoint,
  ISidebarEffectCreator,
  ISidebarStateEffectCreator,
  ISidebarBuilder,
  IEdgeSidebarRegistry,
  SidebarResultStyle,
  SidebarConfigMap,
  SidebarConfigMapById,
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
): ISidebarStateEffectCreator => mapByBreakpoint =>
  effectCreator(config, mapByBreakpoint)

export default (): ISidebarBuilder => {
  const sidebarIds: string[] = []
  const mapByBreakpoint: SidebarConfigMap = {}
  const mapById: SidebarConfigMapById = {}
  const effect: MapBreakpoint<ISidebarStateEffectCreator[]> = {}
  const addConfig = (
    breakpoint: Breakpoint,
    config: SidebarConfig,
    effectCreator?: ISidebarEffectCreator
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
    if (effectCreator) {
      effect[breakpoint].push(createStateEffect(effectCreator, config))
    }

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
            { ...config, id, variant: "persistent" },
            createPersistentSidebarEffect
          )
          return this
        },
        registerPermanentConfig(breakpoint, config) {
          addConfig(
            breakpoint,
            { ...config, id, variant: "permanent" },
            createPermanentSidebarEffect
          )
          return this
        },
        registerTemporaryConfig(breakpoint, config) {
          addConfig(breakpoint, { ...config, id, variant: "temporary" })
          return this
        },
      })
      return Registry()
    },
    getSidebarIds: () => sidebarIds,
    getConfig: () => mapByBreakpoint,
    getConfigMapById: () => mapById,
    getBreakpointConfig: breakpoint =>
      pickNearestBreakpoint(mapByBreakpoint, breakpoint),
    getBreakpointEffect: breakpoint =>
      pickNearestBreakpoint(effect, breakpoint),
    getResultStyle(state, header) {
      const result: SidebarResultStyle = {}

      Object.entries(mapById).forEach(([sidebarId, breakpointConfigMap]) => {
        result[sidebarId] = {
          persistent: {},
          permanent: {},
          temporary: {},
        }
        const breakpoints = combineBreakpoints(
          breakpointConfigMap,
          header.getConfig()
        )
        breakpoints.forEach(bp => {
          const config: SidebarConfig = pickNearestBreakpoint(
            breakpointConfigMap,
            bp
          )
          if (config) {
            const headerEffect = header.getBreakpointEffect(bp)
            if (isPersistentSidebarConfig(config) && headerEffect) {
              result[sidebarId].persistent[bp] = {
                ...createEdgeSidebarModel(config, state),
                ...headerEffect.getEdgeSidebarZIndex(sidebarId),
              }
            } else if (isPermanentSidebarConfig(config) && headerEffect) {
              result[sidebarId].permanent[bp] = {
                ...createEdgeSidebarModel(config, state),
                ...headerEffect.getEdgeSidebarZIndex(sidebarId),
              }
            } else if (isTemporarySidebarConfig(config)) {
              result[sidebarId].temporary[bp] = {
                width: config.width,
              }
            }
          }
        })
      })
      return result
    },
  }
}
