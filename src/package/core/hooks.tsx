import { Theme, useTheme } from "@material-ui/core"
import LayoutContext from "./Context/LayoutContext"
import { useSidebarCtx } from "./Context"
import React from "react"
import { createBreakpointStyles, getSidebarAnchor } from "../utils"

export const useSidebarCta = (sidebarId: string, consumer?: string) => {
  const { breakpoints } = useTheme<Theme>()
  const { id = sidebarId } = useSidebarCtx()
  const props = useSidebar(id, consumer)
  return {
    id,
    breakpoints,
    ...props,
  }
}

export const useLayoutCtx = () => {
  const ctx = React.useContext(LayoutContext)
  if (!ctx) {
    throw new Error("useLayoutCtx must be rendered under LayoutProvider")
  }
  return ctx
}

export const useSidebar = (id: string, consumer?: string) => {
  if (!id) {
    throw new Error(`You must specify a sidebar id to <${consumer} />`)
  }
  const { styles, state, config, ...props } = useLayoutCtx()
  const anchor = getSidebarAnchor(config.sidebarById[id])
  return {
    anchor,
    state: state.sidebar[id],
    styles: styles.sidebar[id],
    config: config.sidebarById[id],
    ...props,
  }
}

export const useHeader = () => {
  const { styles } = useLayoutCtx()
  const { breakpoints } = useTheme<Theme>()
  return {
    styles: createBreakpointStyles(styles.header, breakpoints),
  }
}

export const useContent = () => {
  const { styles } = useLayoutCtx()
  const { breakpoints } = useTheme<Theme>()
  return {
    styles: createBreakpointStyles(styles.content, breakpoints),
  }
}

export const useFooter = () => {
  const { styles } = useLayoutCtx()
  const { breakpoints } = useTheme<Theme>()
  return {
    styles: createBreakpointStyles(styles.footer, breakpoints),
  }
}
