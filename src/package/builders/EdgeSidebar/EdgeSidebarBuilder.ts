import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import createEdgeSidebarModel from "../../models/Sidebar/Edge"
import { createPersistentSidebarEffect } from "../../effects/PersistentSidebar"
import { createPermanentSidebarEffect } from "../../effects/PermanentSidebar"
import { combineBreakpoints, pickNearestBreakpoint } from "../../utils"
import {
  isPermanentSidebarConfig,
  isPersistentSidebarConfig,
  isTemporarySidebarConfig,
} from "../../utils/sidebarChecker"
import {
  EdgeSidebarConfig,
  ISidebarEffectCreator,
  ISidebarStateEffectCreator,
  IEdgeSidebarBuilder,
  IEdgeSidebarRegistry,
  SidebarResultStyle,
  SidebarConfigMap,
  SidebarConfigMapById,
  SidebarEffectMapById,
  SidebarEffectMap,
} from "../../types"

export const isUniqueSidebars = (sidebars: Pick<EdgeSidebarConfig, "id">[]): boolean => {
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
  config: EdgeSidebarConfig
): ISidebarStateEffectCreator => state => effectCreator(config, state)

export default (): IEdgeSidebarBuilder => {
  const sidebarIds: string[] = []
  const mapByBreakpoint: SidebarConfigMap = {}
  const mapById: SidebarConfigMapById = {}
  const effect: SidebarEffectMap = {}
  const effectById: SidebarEffectMapById = {}
  const addConfig = (
    breakpoint: Breakpoint,
    config: EdgeSidebarConfig,
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
    if (!effectById[config.id]) {
      effectById[config.id] = {}
    }
    effectById[config.id][breakpoint] = createStateEffect(effectCreator, config)

    if (!isUniqueSidebars(mapByBreakpoint[breakpoint])) {
      throw new Error(
        `Sidebar id: ${config.id} is duplicated at breakpoint "${breakpoint}"`
      )
    }
  }
  return {
    create: function(id: string) {
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
    getBreakpointEffectById: (id, breakpoint) =>
      pickNearestBreakpoint(effectById[id], breakpoint),
    iterateBreakpointEffects(state, breakpoints = [], getEffects) {
      let foundAllSidebars = false
      breakpoints.forEach(bp => {
        const sidebarIds = this.getSidebarIds()
        const sidebarCount = sidebarIds.length
        const stateEffectCreators: ISidebarStateEffectCreator[] = this.getBreakpointEffect(
          bp
        )
        if (stateEffectCreators) {
          const effects = stateEffectCreators.map(c => c(state))
          if (!foundAllSidebars && effects.length === sidebarCount) {
            foundAllSidebars = true
          }
          if (foundAllSidebars && effects.length < sidebarCount) {
            // attach all
            const existingIds = effects.map(({ id }) => id)
            const missingIds: string[] = sidebarIds.filter(
              (id: string) => !existingIds.includes(id)
            )
            missingIds.forEach(id => {
              effects.push(this.getBreakpointEffectById(id, bp)(state))
            })
          }
          getEffects(bp, effects)
        } else {
          getEffects(bp, [])
        }
      })
    },
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
          const config: EdgeSidebarConfig = pickNearestBreakpoint(
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
