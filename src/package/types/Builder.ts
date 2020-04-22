import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import {
  HeaderConfig,
  PermanentSidebarConfig,
  PersistentSidebarConfig,
  EdgeSidebarConfig,
  TemporarySidebarConfig,
} from "./Config"
import { Dictionary, MapBreakpoint } from "./Utils"
import {
  IHeaderEffect,
  ISidebarEffect,
  ISidebarStateEffectCreator,
} from "./Model"
import { State } from "./Context"
import { ResultStyle, SidebarResultStyle } from "./InlineStyle"

export type HeaderConfigMap = MapBreakpoint<HeaderConfig>
export type SidebarConfigMap = MapBreakpoint<EdgeSidebarConfig[]>
export type SidebarConfigMapById = Dictionary<MapBreakpoint<EdgeSidebarConfig>>
export type SidebarEffectMap = MapBreakpoint<ISidebarStateEffectCreator[]>
export type SidebarEffectMapById = Dictionary<
  MapBreakpoint<ISidebarStateEffectCreator>
>
export type EdgeSidebarData = {
  sidebarIds: string[]
  configMap: MapBreakpoint<EdgeSidebarConfig[]>
  configMapById: Dictionary<MapBreakpoint<EdgeSidebarConfig>>
}

export interface IRegistry<ConfigType> {
  registerConfig: (
    breakpoint: Breakpoint,
    config: Omit<ConfigType, "id">
  ) => IRegistry<ConfigType>
}

export interface IFooterBuilder {
  create: (id: string) => void
  getResultStyle: (state: State, sidebar: IEdgeSidebarBuilder) => ResultStyle
}

export interface IContentBuilder {
  create: (id: string) => void
  getResultStyle: (state: State, sidebar: IEdgeSidebarBuilder) => ResultStyle
}

export interface IHeaderBuilder {
  create: (id: string) => IRegistry<HeaderConfig>
  getConfig: () => MapBreakpoint<HeaderConfig>
  getBreakpointConfig: (breakpoint: Breakpoint) => HeaderConfig
  getBreakpointEffect: (breakpoint: Breakpoint) => IHeaderEffect
  getResultStyle: (state: State, sidebar: IEdgeSidebarBuilder) => ResultStyle
}

export interface IEdgeSidebarRegistry {
  registerPersistentConfig: (
    breakpoint: Breakpoint,
    config: Omit<PersistentSidebarConfig, "id" | "variant">
  ) => IEdgeSidebarRegistry
  registerPermanentConfig: (
    breakpoint: Breakpoint,
    config: Omit<PermanentSidebarConfig, "id" | "variant">
  ) => IEdgeSidebarRegistry
  registerTemporaryConfig: (
    breakpoint: Breakpoint,
    config: Omit<TemporarySidebarConfig, "id" | "variant">
  ) => IEdgeSidebarRegistry
}

export interface IEdgeSidebarBuilder {
  create: (id: string) => IEdgeSidebarRegistry
  getSidebarIds: () => string[]
  getData: () => EdgeSidebarData
  getConfig: () => MapBreakpoint<EdgeSidebarConfig[]>
  getConfigMapById: () => Dictionary<MapBreakpoint<EdgeSidebarConfig>>
  getBreakpointConfig: (breakpoint: Breakpoint) => EdgeSidebarConfig[]
  getBreakpointEffect: (breakpoint: Breakpoint) => ISidebarStateEffectCreator[]
  getBreakpointEffectById: (
    id: string,
    breakpoint: Breakpoint
  ) => ISidebarStateEffectCreator
  iterateBreakpointEffects: (
    state: State,
    breakpoints: Breakpoint[],
    getEffects: (breakpoint: Breakpoint, effects?: ISidebarEffect[]) => void
  ) => void
  getResultStyle: (state: State, header: IHeaderBuilder) => SidebarResultStyle
}
