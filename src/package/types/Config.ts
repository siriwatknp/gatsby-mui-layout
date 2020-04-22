import { AppendDictionary, Dictionary } from "./Utils"
import {
  EdgeSidebarData,
  HeaderConfigMap,
  SidebarConfigMap,
  SidebarConfigMapById,
} from "./Builder"
import { InsetSidebarConfigMap } from "../builders/InsetSidebar/InsetSidebarBuilder"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"

export type PersistentBehavior = "fit" | "flexible" | "none"

export type DrawerAnchor = "left" | "right"

export type FixedInsetSidebarConfig = {
  id?: string
  anchor: DrawerAnchor
  width: number | string
  variant: "fixed"
}

export type AbsoluteInsetSidebarConfig = {
  id?: string
  width: number | string
  variant: "absolute"
}

export type StickyInsetSidebarConfig = {
  id?: string
  width: number | string
  top: number | string
  variant: "sticky"
}

export type InsetSidebarConfig =
  | FixedInsetSidebarConfig
  | AbsoluteInsetSidebarConfig
  | StickyInsetSidebarConfig

export interface CollapsibleSidebarConfig {
  id: string
  anchor?: DrawerAnchor
  collapsible: boolean
  collapsedWidth?: number | string
  width: number | string
}

export interface PermanentSidebarConfig extends CollapsibleSidebarConfig {
  variant?: "permanent"
}

export interface PersistentSidebarConfig extends CollapsibleSidebarConfig {
  persistentBehavior: AppendDictionary<PersistentBehavior>
  variant: "persistent"
}

export interface TemporarySidebarConfig {
  id: string
  width: number | string
  variant?: "temporary"
  anchor?: DrawerAnchor
}

export type EdgeSidebarConfig =
  | PersistentSidebarConfig
  | PermanentSidebarConfig
  | TemporarySidebarConfig

export type Position = "relative" | "sticky" | "absolute" | "fixed"

export interface HeaderConfig {
  id: string
  position: Position
  clipped?: AppendDictionary<boolean>
  initialHeight?: number | string
}

export interface GlobalConfig {
  autoCollapse: Dictionary<false | Breakpoint>
}

export interface ILayoutConfig {
  edgeSidebar: EdgeSidebarData
  header: HeaderConfigMap
}

export type LayoutConfig = {
  header: HeaderConfigMap
  sidebar: SidebarConfigMap
  sidebarById: SidebarConfigMapById
  inset: InsetSidebarConfigMap
  global: GlobalConfig
}
