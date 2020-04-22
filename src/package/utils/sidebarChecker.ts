import {
  AbsoluteInsetSidebarConfig,
  FixedInsetSidebarConfig,
  InsetSidebarConfig,
  PermanentSidebarConfig,
  PersistentSidebarConfig,
  EdgeSidebarConfig,
  StickyInsetSidebarConfig,
  TemporarySidebarConfig,
} from "../types"

export const isPersistentSidebarConfig = (
  config: EdgeSidebarConfig
): config is PersistentSidebarConfig => {
  return (config as PersistentSidebarConfig).variant === "persistent"
}

export const isPermanentSidebarConfig = (
  config: EdgeSidebarConfig
): config is PermanentSidebarConfig => {
  return (config as PermanentSidebarConfig).variant === "permanent"
}

export const isTemporarySidebarConfig = (
  config: EdgeSidebarConfig
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
