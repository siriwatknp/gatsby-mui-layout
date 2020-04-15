import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import {
  HeaderConfig,
  PermanentSidebarConfig,
  PersistentSidebarConfig,
  SidebarConfig,
} from "./Config"
import { MapBreakpoint } from "./Utils"
import { IHeaderEffect, ISidebarStateEffectCreator } from "./Model"
import { State } from "./Context"
import { ResultStyle, SidebarResultStyle } from "./InlineStyle"

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

export interface IEdgeSidebarRegistry {
  registerPersistentConfig: (
    breakpoint: Breakpoint,
    config: Omit<PersistentSidebarConfig, "id">
  ) => IEdgeSidebarRegistry
  registerPermanentConfig: (
    breakpoint: Breakpoint,
    config: Omit<PermanentSidebarConfig, "id">
  ) => IEdgeSidebarRegistry
}

export interface ISidebarBuilder {
  createEdgeSidebar: (id: string) => IEdgeSidebarRegistry
  getSidebarIds: () => string[]
  getConfig: () => MapBreakpoint<SidebarConfig[]>
  getBreakpointConfig: (breakpoint: Breakpoint) => SidebarConfig[]
  getBreakpointEffect: (breakpoint: Breakpoint) => ISidebarStateEffectCreator[]
  getResultStyle: (state: State, header: IHeaderBuilder) => SidebarResultStyle
}
