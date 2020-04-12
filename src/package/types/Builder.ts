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

export interface IHeaderBuilder {
  createConfig: (breakpoint: Breakpoint, config: HeaderConfig) => void
  getConfig: () => MapBreakpoint<HeaderConfig>
  getBreakpointConfig: (breakpoint: Breakpoint) => HeaderConfig
  getBreakpointEffect: (breakpoint: Breakpoint) => IHeaderEffect
  getResultStyle: (state: State, sidebar: ISidebarBuilder) => ResultStyle
}

export interface ISidebarBuilder {
  createPersistentSidebarConfig: (
    breakpoint: Breakpoint,
    config: PersistentSidebarConfig
  ) => void
  createTemporarySidebarConfig: (
    breakpoint: Breakpoint,
    config: TemporarySidebarConfig
  ) => void
  getConfig: () => MapBreakpoint<SidebarConfig[]>
  getBreakpointConfig: (breakpoint: Breakpoint) => SidebarConfig[]
  getBreakpointEffects: (breakpoint: Breakpoint) => ISidebarStateEffectCreator[]
}
