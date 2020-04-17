import {
  EdgeSidebarConfig, PermanentSidebarConfig,
  PersistentSidebarConfig,
  SidebarConfig, TemporarySidebarConfig,
} from "../types"

export const isEdgeSidebarConfig = (
  config: SidebarConfig
): config is EdgeSidebarConfig => {
  return typeof (config as EdgeSidebarConfig).collapsible === "boolean"
}

export const isPersistentSidebarConfig = (
  config: SidebarConfig
): config is PersistentSidebarConfig => {
  return (config as PersistentSidebarConfig).variant === "persistent"
}

export const isPermanentSidebarConfig = (
  config: SidebarConfig
): config is PermanentSidebarConfig => {
  return (config as PermanentSidebarConfig).variant === "permanent"
}

export const isTemporarySidebarConfig = (
  config: SidebarConfig
): config is TemporarySidebarConfig => {
  return (config as TemporarySidebarConfig).variant === "temporary"
}
