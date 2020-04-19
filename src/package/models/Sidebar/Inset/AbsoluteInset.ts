import { AbsoluteInsetSidebarConfig } from "../../../types"

export default (config: AbsoluteInsetSidebarConfig) => {
  return {
    getRootStyle: () => ({
      width: config.width,
    }),
    getBodyStyle: () => ({
      position: "absolute" as const,
      top: 0,
      width: "100%",
    }),
  }
}
