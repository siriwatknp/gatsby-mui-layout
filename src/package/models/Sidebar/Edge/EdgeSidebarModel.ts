import { CollapsibleSidebarConfig, State } from "../../../types"

export type CollapsibleConfigParam = Pick<
  CollapsibleSidebarConfig,
  "id" | "collapsible" | "collapsedWidth" | "width"
  >

export default (
  config: CollapsibleConfigParam,
  state?: State
) => {
  const { collapsible, collapsedWidth, width } = config
  const isSidebarCollapsed = state?.sidebar?.[config.id]?.collapsed
  const sidebarWidth =
    collapsible && isSidebarCollapsed ? collapsedWidth : width

  return {
    width: sidebarWidth,
  }
}
