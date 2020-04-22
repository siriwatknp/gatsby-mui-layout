import { useEffect } from "react"
import { keys } from "@material-ui/core/styles/createBreakpoints"
import useScreen from "./useScreen"
import { useLayoutCtx } from "../Context"

export default (sidebarId: string) => {
  const {
    config: {
      global: {
        autoCollapse: { [sidebarId]: sidebarAutoCollapse },
      },
    },
    setCollapsed,
  } = useLayoutCtx()
  const screen = useScreen()
  useEffect(() => {
    if (sidebarAutoCollapse && screen) {
      if (keys.indexOf(screen) <= keys.indexOf(sidebarAutoCollapse)) {
        setCollapsed(sidebarId, true)
      } else {
        setCollapsed(sidebarId, false)
      }
    }
  }, [screen])
}
