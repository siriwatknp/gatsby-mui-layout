import {
  AbsoluteInsetSidebarConfig,
  EdgeSidebarConfig,
  FixedInsetSidebarConfig,
  InsetSidebarConfig,
  PermanentSidebarConfig,
  PersistentSidebarConfig,
  SidebarConfig,
  StickyInsetSidebarConfig,
  TemporarySidebarConfig,
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

export const isFixedInsetSidebarConfig = (
  config: InsetSidebarConfig
): config is FixedInsetSidebarConfig => {
  return (config as FixedInsetSidebarConfig).variant === "fixed"
}

export const isAbsoluteInsetSidebarConfig = (
  config: InsetSidebarConfig
): config is AbsoluteInsetSidebarConfig => {
  return (config as AbsoluteInsetSidebarConfig).variant === "absolute"
}

export const isStickyInsetSidebarConfig = (
  config: InsetSidebarConfig
): config is StickyInsetSidebarConfig => {
  return (config as StickyInsetSidebarConfig).variant === "sticky"
}
