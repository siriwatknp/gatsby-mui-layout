import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import {
  HeaderConfig,
  PersistentSidebarConfig,
  SidebarConfig,
  TemporarySidebarConfig,
} from "./Config"
import { MapBreakpoint } from "./Utils"
import { IHeaderEffect, ISidebarStateEffectCreator } from "./Model"
import { State } from "./Context"
import { ResultStyle } from "./InlineStyle"

export interface IRegistry<ConfigType> {
  registerConfig: (
    breakpoint: Breakpoint,
    config: Omit<ConfigType, "id">
  ) => IRegistry<ConfigType>
}

export interface IHeaderBuilder {
  create: (id: string) => IRegistry<HeaderConfig>
  getConfig: () => MapBreakpoint<HeaderConfig>
  getBreakpointConfig: (breakpoint: Breakpoint) => HeaderConfig
  getBreakpointEffect: (breakpoint: Breakpoint) => IHeaderEffect
  getResultStyle: (state: State, sidebar: ISidebarBuilder) => ResultStyle
}

export interface ISidebarRegistry {
  registerPersistentSidebarConfig: (
    breakpoint: Breakpoint,
    config: Omit<PersistentSidebarConfig, "id">
  ) => ISidebarRegistry
  registerTemporarySidebarConfig: (
    breakpoint: Breakpoint,
    config: Omit<TemporarySidebarConfig, "id">
  ) => ISidebarRegistry
}

export interface ISidebarBuilder {
  create: (id: string) => ISidebarRegistry
  getSidebarIds: () => string[]
  getConfig: () => MapBreakpoint<SidebarConfig[]>
  getBreakpointConfig: (breakpoint: Breakpoint) => SidebarConfig[]
  getBreakpointEffect: (breakpoint: Breakpoint) => ISidebarStateEffectCreator[]
  getResultStyle: (state: State, header: IHeaderBuilder) => ResultStyle
}
