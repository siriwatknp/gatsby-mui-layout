import { AppendDictionary, Dictionary } from './Utils';

export type PersistentBehavior = "fit" | "flexible"
export type PersistentBehaviorById = Dictionary<PersistentBehavior>
export type InsetBehavior = "fit"

export type DrawerAnchor = "left" | "right"

export interface EdgeSidebarConfig {
  id: string
  anchor: DrawerAnchor
  collapsible: boolean
  collapsedWidth: number | string
  width: number | string
}

export interface PersistentSidebarConfig extends EdgeSidebarConfig {
  persistentBehavior: AppendDictionary<PersistentBehavior>,
}

export interface InsetSidebarConfig {

}

export type SidebarConfig = EdgeSidebarConfig;

export type Position = "static" | "relative" | "sticky" | "absolute" | "fixed"

export interface HeaderConfig {
  id: string
  position: Position
  clipped?: AppendDictionary<boolean>
}
