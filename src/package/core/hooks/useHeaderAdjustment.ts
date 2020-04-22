import { useState, useEffect } from "react"
import { useLayoutCtx } from "../Context"
import useScreen from "./useScreen"
import useScrollY from "./useScrollY"
import useHeaderResize from "./useHeaderResize"
import { pickNearestBreakpoint, toValidCssValue } from "../../utils"
import HeaderEffect from "../../effects/Header"
import { HeaderHeightParams } from "../../types"

const calc = (...args: (string | number)[]) =>
  `calc(${args.map(toValidCssValue).join(" - ")})`

export default (options?: HeaderHeightParams): { height: string } => {
  const screen = useScreen()
  const scrollY = useScrollY()
  const {
    config: { header },
  } = useLayoutCtx()
  const breakpointConfig = pickNearestBreakpoint(header, screen)
  const { id: headerId } = breakpointConfig
  const headerEffect = HeaderEffect(breakpointConfig)
  const initialHeight = headerEffect.getInitialHeight(options)
  const resizedHeight = useHeaderResize(headerId, initialHeight)
  const [headerHeight, setHeaderHeight] = useState(calc(initialHeight))
  useEffect(() => {
    setHeaderHeight(
      headerEffect.getUpdatedHeight({
        ...options,
        height: resizedHeight,
        scrollY,
      })
    )
  }, [resizedHeight, screen, scrollY])

  return { height: headerHeight } // inline style
}
