import { AppendDictionary, Dictionary } from "./Utils"

export type PersistentBehavior = "fit" | "flexible" | "none"
export type PersistentBehaviorById = Dictionary<PersistentBehavior>
export type InsetBehavior = "fit"

export type DrawerAnchor = "left" | "right"

export interface CollapsibleSidebarConfig {
  id: string
  anchor?: DrawerAnchor
  collapsible: boolean
  collapsedWidth?: number | string
  width: number | string
}

export interface PermanentSidebarConfig extends CollapsibleSidebarConfig {
  variant: "permanent"
}

export interface PersistentSidebarConfig extends CollapsibleSidebarConfig {
  persistentBehavior: AppendDictionary<PersistentBehavior>
  variant: "persistent"
}

export interface InsetSidebarConfig {
  id: string
}

export interface TemporarySidebarConfig {
  id: string
  width: number | string
  variant: "temporary"
  anchor?: DrawerAnchor
}

export type EdgeSidebarConfig = PersistentSidebarConfig | PermanentSidebarConfig

export type SidebarConfig =
  | EdgeSidebarConfig
  | TemporarySidebarConfig
  | InsetSidebarConfig

export type Position = "static" | "relative" | "sticky" | "absolute" | "fixed"

export interface HeaderConfig {
  id: string
  position: Position
  clipped?: AppendDictionary<boolean>
}
