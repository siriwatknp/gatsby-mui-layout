import { CollapsibleSidebarConfig, State } from "../../../types"

export default (config: CollapsibleSidebarConfig, state?: State) => {
  const { collapsible, collapsedWidth, width } = config
  const isSidebarCollapsed = state?.sidebar?.[config.id]?.collapsed
  const sidebarWidth =
    collapsible && isSidebarCollapsed ? collapsedWidth : width

  return {
    width: sidebarWidth,
  }
}
