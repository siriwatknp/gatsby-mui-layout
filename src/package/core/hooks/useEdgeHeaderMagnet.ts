import { useState, useEffect } from "react"
import { useLayoutCtx } from "../Context"
import useScreen from "./useScreen"
import useScrollY from "./useScrollY"
import useHeaderResize from "./useHeaderResize"
import { pickNearestBreakpoint, toValidCssValue } from "../../utils"
import HeaderEffect from "../../effects/Header"
import { isCollapsibleSidebarConfig } from "../../utils/sidebarChecker"

const calc = (...args: (string | number)[]) =>
  `calc(${args.map(toValidCssValue).join(" - ")})`

export default (sidebarId: string): { height: string } => {
  const screen = useScreen()
  const scrollY = useScrollY()
  const {
    data: { header, headerId, edgeSidebar },
  } = useLayoutCtx()
  const headerConfig = pickNearestBreakpoint(header, screen)
  const headerEffect = HeaderEffect(headerConfig)
  const sidebarConfig = pickNearestBreakpoint(
    edgeSidebar.configMapById[sidebarId],
    screen
  )
  const resizedHeight = useHeaderResize(headerId)
  const [headerHeight, setHeaderHeight] = useState("")
  useEffect(() => {
    if (
      resizedHeight &&
      headerConfig.position === "relative" &&
      headerEffect.isObjectClipped(sidebarId) &&
      isCollapsibleSidebarConfig(sidebarConfig) &&
      sidebarConfig.headerMagnetEnabled
    ) {
      setHeaderHeight(calc(resizedHeight, scrollY))
    }
  }, [resizedHeight, screen, scrollY])

  return { height: headerHeight } // inline style
}
