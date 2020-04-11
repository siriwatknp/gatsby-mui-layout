import { EdgeSidebarConfig, State } from "../../types"

export default (config: EdgeSidebarConfig, state: State) => {
  const { collapsible, collapsedWidth, width } = config
  const { collapsed } = state

  const sidebarWidth = collapsible && collapsed ? collapsedWidth : width

  return {
    currentWidth: sidebarWidth,
  }
}
