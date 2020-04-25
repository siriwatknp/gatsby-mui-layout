import React from "react"
import useTheme from "@material-ui/core/styles/useTheme"
import { SwipeableDrawerProps } from "@material-ui/core/SwipeableDrawer"
import PersistentSwipeableDrawer from "./Persistent"
import PermanentSwipeableDrawer from "./Permanent"
import TemporarySwipeableDrawer from "./Temporary"
import { useSidebar, SidebarProvider } from "../../core"
import useSidebarAutoCollapse from "../../core/hooks/useSidebarAutoCollapse"
import { createBreakpointStyles, createHiddenStyles } from "../../utils"
import EdgeHeaderOffset from "../EdgeHeaderOffset"

const SwipeableSidebar = ({
  onClose,
  onOpen,
  children,
  ...props
}: Omit<SwipeableDrawerProps, "variant" | "open" | "onClose" | "onOpen"> & {
  sidebarId: string
  onClose?: SwipeableDrawerProps["onClose"]
  onOpen?: SwipeableDrawerProps["onOpen"]
}) => {
  const { sidebarId } = props
  useSidebarAutoCollapse(sidebarId)
  const { breakpoints } = useTheme()
  const {
    styles: { permanent, persistent, temporary },
    state,
    anchor,
    setOpen,
  } = useSidebar(sidebarId, "SwipeableDrawer")
  const wrappedOnOpen: SwipeableDrawerProps["onOpen"] = (...args) => {
    if (typeof onOpen === "function") onOpen(...args)
    setOpen(sidebarId, true)
  }
  const wrappedOnClose: SwipeableDrawerProps["onClose"] = (...args) => {
    if (typeof onOpen === "function") onClose(...args)
    setOpen(sidebarId, false)
  }
  const commonProps = {
    ...props,
    anchor,
    open: state.open,
    onOpen: wrappedOnOpen,
    onClose: wrappedOnClose,
  }

  const headerAdjustment = <EdgeHeaderOffset sidebarId={sidebarId} />

  return (
    <SidebarProvider id={sidebarId}>
      <TemporarySwipeableDrawer
        disableScrollLock
        {...commonProps}
        hiddenStyles={createHiddenStyles(
          temporary,
          [permanent, persistent],
          breakpoints
        )}
        styles={createBreakpointStyles(temporary, breakpoints)}
      >
        {children}
      </TemporarySwipeableDrawer>
      <PersistentSwipeableDrawer
        {...commonProps}
        hiddenStyles={createHiddenStyles(
          persistent,
          [temporary, permanent],
          breakpoints
        )}
        styles={createBreakpointStyles(persistent, breakpoints)}
      >
        {headerAdjustment}
        {children}
      </PersistentSwipeableDrawer>
      <PermanentSwipeableDrawer
        {...commonProps}
        hiddenStyles={createHiddenStyles(
          permanent,
          [temporary, persistent],
          breakpoints
        )}
        styles={createBreakpointStyles(permanent, breakpoints)}
      >
        {headerAdjustment}
        {children}
      </PermanentSwipeableDrawer>
    </SidebarProvider>
  )
}

export default SwipeableSidebar
