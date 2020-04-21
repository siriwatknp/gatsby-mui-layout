import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import {
  HeaderConfig,
  PermanentSidebarConfig,
  PersistentSidebarConfig,
  SidebarConfig,
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
export type SidebarConfigMap = MapBreakpoint<SidebarConfig[]>
export type SidebarConfigMapById = Dictionary<MapBreakpoint<SidebarConfig>>
export type SidebarEffectMap = MapBreakpoint<ISidebarStateEffectCreator[]>
export type SidebarEffectMapById = Dictionary<
  MapBreakpoint<ISidebarStateEffectCreator>
>

export interface IRegistry<ConfigType> {
  registerConfig: (
    breakpoint: Breakpoint,
    config: Omit<ConfigType, "id">
  ) => IRegistry<ConfigType>
}

export interface IFooterBuilder {
  create: (id: string) => void
  getResultStyle: (state: State, sidebar: ISidebarBuilder) => ResultStyle
}

export interface IContentBuilder {
  create: (id: string) => void
  getResultStyle: (state: State, sidebar: ISidebarBuilder) => ResultStyle
}

export interface IHeaderBuilder {
  create: (id: string) => IRegistry<HeaderConfig>
  getConfig: () => MapBreakpoint<HeaderConfig>
  getBreakpointConfig: (breakpoint: Breakpoint) => HeaderConfig
  getBreakpointEffect: (breakpoint: Breakpoint) => IHeaderEffect
  getResultStyle: (state: State, sidebar: ISidebarBuilder) => ResultStyle
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

export interface ISidebarBuilder {
  createEdgeSidebar: (id: string) => IEdgeSidebarRegistry
  getSidebarIds: () => string[]
  getConfig: () => MapBreakpoint<SidebarConfig[]>
  getConfigMapById: () => Dictionary<MapBreakpoint<SidebarConfig>>
  getBreakpointConfig: (breakpoint: Breakpoint) => SidebarConfig[]
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
