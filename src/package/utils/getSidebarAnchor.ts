import { DrawerAnchor, MapBreakpoint, SidebarConfig } from "../types"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"

export default (configMap: MapBreakpoint<Pick<SidebarConfig, "anchor">>) => {
  if (process.env.NODE_ENV !== "production") {
    const configs: SidebarConfig[] = Object.entries(configMap).reduce(
      (result, curr) => [...result, curr],
      []
    )
    const anchorList: DrawerAnchor[] = []
    configs.forEach(c => {
      if (!anchorList.includes(c.anchor)) {
        anchorList.push(c.anchor)
      }
    })
    if (anchorList.length > 1) {
      console.warn(
        "It seems like you define multiple anchors in one Sidebar, the 1st anchor found will be used."
      )
    }
  }
  const keys = Object.keys(configMap) as Breakpoint[]
  return configMap[keys[0]].anchor
}
