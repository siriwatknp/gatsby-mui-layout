import React from "react"
import useTheme from "@material-ui/core/styles/useTheme"
import { SwipeableDrawerProps } from "@material-ui/core/SwipeableDrawer"
import { useSidebar, SidebarProvider } from "../../core"
import useSidebarAutoCollapse from "../../core/hooks/useSidebarAutoCollapse"
import PersistentSwipeableDrawer from "./Persistent"
import PermanentSwipeableDrawer from "./Permanent"
import TemporarySwipeableDrawer from "./Temporary"
import { createBreakpointStyles, createHiddenStyles } from "../../utils"

const SwipeableSidebar = ({
  onClose,
  onOpen,
  ...props
}: Omit<SwipeableDrawerProps, "variant" | "open" | "onClose" | "onOpen"> & {
  id: string
  onClose?: SwipeableDrawerProps["onClose"]
  onOpen?: SwipeableDrawerProps["onOpen"]
}) => {
  useSidebarAutoCollapse(props.id)
  const { breakpoints } = useTheme()
  const {
    styles: { permanent, persistent, temporary },
    state,
    anchor,
    setOpen,
  } = useSidebar(props.id)
  const wrappedOnOpen: SwipeableDrawerProps["onOpen"] = (...args) => {
    if (typeof onOpen === "function") onOpen(...args)
    setOpen(props.id, true)
  }
  const wrappedOnClose: SwipeableDrawerProps["onClose"] = (...args) => {
    if (typeof onOpen === "function") onClose(...args)
    setOpen(props.id, false)
  }
  const commonProps = {
    ...props,
    anchor,
    open: state.open,
    onOpen: wrappedOnOpen,
    onClose: wrappedOnClose,
  }

  return (
    <SidebarProvider id={props.id}>
      <TemporarySwipeableDrawer
        disableScrollLock
        {...commonProps}
        hiddenStyles={createHiddenStyles(
          temporary,
          [permanent, persistent],
          breakpoints
        )}
        styles={createBreakpointStyles(temporary, breakpoints)}
      />
      <PersistentSwipeableDrawer
        {...commonProps}
        hiddenStyles={createHiddenStyles(
          persistent,
          [temporary, permanent],
          breakpoints
        )}
        styles={createBreakpointStyles(persistent, breakpoints)}
      />
      <PermanentSwipeableDrawer
        {...commonProps}
        hiddenStyles={createHiddenStyles(
          permanent,
          [temporary, persistent],
          breakpoints
        )}
        styles={createBreakpointStyles(permanent, breakpoints)}
      />
    </SidebarProvider>
  )
}

export default SwipeableSidebar
