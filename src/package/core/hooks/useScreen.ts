import React from "react"
import debounce from "debounce"
import useTheme from "@material-ui/core/styles/useTheme"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import mapWidthToScreen from "../../utils/mapWidthToScreen"

function getWindowWidth(w: Window) {
  return typeof w === "object" ? w.innerWidth : undefined
}

export default (): Breakpoint => {
  const { breakpoints } = useTheme()
  const getScreen = (): Breakpoint =>
    mapWidthToScreen(getWindowWidth(window), breakpoints)

  const [screen, setScreen] = React.useState<Breakpoint>(getScreen())
  const updater = React.useRef(
    debounce(() => {
      setScreen(getScreen())
    }, 200)
  )

  React.useEffect(() => {
    window.addEventListener("resize", updater.current)
    return () => {
      window.removeEventListener("resize", updater.current)
    }
  }, [])

  return screen
}
