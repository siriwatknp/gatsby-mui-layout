import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import {
  HeaderConfig,
  PermanentSidebarConfig,
  PersistentSidebarConfig,
  EdgeSidebarConfig,
  TemporarySidebarConfig, InsetSidebarConfig,
} from "./Config"
import { Dictionary, MapBreakpoint } from "./Utils"

export type HeaderConfigMap = MapBreakpoint<HeaderConfig>
export type SidebarConfigMap = MapBreakpoint<EdgeSidebarConfig[]>
export type SidebarConfigMapById = Dictionary<MapBreakpoint<EdgeSidebarConfig>>
export type EdgeSidebarData = {
  sidebarIds: string[]
  configMap: MapBreakpoint<EdgeSidebarConfig[]>
  configMapById: Dictionary<MapBreakpoint<EdgeSidebarConfig>>
}

export type InsetSidebarData = {
  configMapById: Dictionary<MapBreakpoint<InsetSidebarConfig>>
  configMap: MapBreakpoint<InsetSidebarConfig[]>
}

export interface IRegistry<ConfigType> {
  registerConfig: (
    breakpoint: Breakpoint,
    config: Omit<ConfigType, "id">
  ) => IRegistry<ConfigType>
}

export interface IFooterBuilder {
  create: (id: string) => void
  getData: () => { id: string }
}

export interface IContentBuilder {
  create: (id: string) => void
  getData: () => { id: string }
}

export interface IHeaderBuilder {
  create: (id: string) => IRegistry<HeaderConfig>
  getData: () => HeaderConfigMap
  getConfig: () => HeaderConfigMap
  getBreakpointConfig: (breakpoint: Breakpoint) => HeaderConfig
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
}
