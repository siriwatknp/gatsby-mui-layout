import React from "react"
import useTheme from "@material-ui/core/styles/useTheme"
import { DrawerProps } from "@material-ui/core/Drawer"
import { useSidebar, SidebarProvider } from "../../core"
import useSidebarAutoCollapse from "../../core/hooks/useSidebarAutoCollapse"
import PersistentDrawer from "./Persistent"
import PermanentDrawer from "./Permanent"
import TemporaryDrawer from "./Temporary"
import {
  createBreakpointStyles,
  createHiddenStyles,
} from "../../utils"

const DrawerSidebar = ({
  onClose,
  ...props
}: Omit<DrawerProps, "variant"> & {
  id: string
}) => {
  useSidebarAutoCollapse(props.id)
  const { breakpoints } = useTheme()
  const {
    anchor,
    styles: { permanent, persistent, temporary },
    state,
    setOpen,
  } = useSidebar(props.id)
  const wrappedOnClose: DrawerProps["onClose"] = (...args) => {
    if (typeof onClose === "function") onClose(...args)
    setOpen(props.id, false)
  }
  const commonProps = {
    ...props,
    anchor,
    open: state.open,
    onClose: wrappedOnClose,
  }

  return (
    <SidebarProvider id={props.id}>
      <TemporaryDrawer
        disableScrollLock
        {...commonProps}
        hiddenStyles={createHiddenStyles(
          temporary,
          [permanent, persistent],
          breakpoints
        )}
        styles={createBreakpointStyles(temporary, breakpoints)}
      />
      <PersistentDrawer
        {...commonProps}
        hiddenStyles={createHiddenStyles(
          persistent,
          [temporary, permanent],
          breakpoints
        )}
        styles={createBreakpointStyles(persistent, breakpoints)}
      />
      <PermanentDrawer
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

export default DrawerSidebar
