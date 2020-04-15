import { EdgeSidebarConfig, PersistentSidebarConfig, SidebarConfig } from "../types"

export const isEdgeSidebarConfig = (
  config: SidebarConfig
): config is EdgeSidebarConfig => {
  return typeof (config as EdgeSidebarConfig).collapsible === "boolean"
}

export const isPersistentSidebarConfig = (
  config: SidebarConfig
): config is PersistentSidebarConfig => {
  return !!(config as PersistentSidebarConfig).persistentBehavior
}
