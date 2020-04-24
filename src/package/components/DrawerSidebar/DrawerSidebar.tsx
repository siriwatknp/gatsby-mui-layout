import React from "react"
import useTheme from "@material-ui/core/styles/useTheme"
import { DrawerProps } from "@material-ui/core/Drawer"
import { useSidebar, SidebarProvider } from "../../core"
import useSidebarAutoCollapse from "../../core/hooks/useSidebarAutoCollapse"
import PersistentDrawer from "./Persistent"
import PermanentDrawer from "./Permanent"
import TemporaryDrawer from "./Temporary"
import EdgeHeaderOffset from "../EdgeHeaderOffset"
import useAdjustmentStable from "../../core/hooks/useAdjustmentStable"
import { createBreakpointStyles, createHiddenStyles } from "../../utils"
import { isCollapsibleSidebarConfig } from "../../utils/sidebarChecker"

const DrawerSidebar = ({
  onClose,
  children,
  ...props
}: Omit<DrawerProps, "variant"> & {
  sidebarId: string
}) => {
  const sidebarId = props.sidebarId
  useSidebarAutoCollapse(sidebarId)
  const { breakpoints } = useTheme()
  const {
    anchor,
    styles: { permanent, persistent, temporary },
    state,
    setOpen,
    edgeSidebar,
  } = useSidebar(sidebarId)
  const wrappedOnClose: DrawerProps["onClose"] = (...args) => {
    if (typeof onClose === "function") onClose(...args)
    setOpen(sidebarId, false)
  }
  const commonProps = {
    ...props,
    anchor,
    open: state.open,
    onClose: wrappedOnClose,
  }

  const stable = useAdjustmentStable(
    edgeSidebar.configMapById?.[sidebarId],
    isCollapsibleSidebarConfig
  )
  const headerAdjustment = (
    <EdgeHeaderOffset sidebarId={sidebarId} />
  )

  return (
    <SidebarProvider id={sidebarId}>
      <TemporaryDrawer
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
      </TemporaryDrawer>
      <PersistentDrawer
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
      </PersistentDrawer>
      <PermanentDrawer
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
      </PermanentDrawer>
    </SidebarProvider>
  )
}

export default DrawerSidebar
