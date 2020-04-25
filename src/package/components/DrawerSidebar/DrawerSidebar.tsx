import React from "react"
import cx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import useTheme from "@material-ui/core/styles/useTheme"
import { DrawerProps } from "@material-ui/core/Drawer"
import { useSidebar, SidebarProvider } from "../../core"
import { useBreakpointConfig, useSidebarAutoCollapse } from "../../core/hooks"
import PersistentDrawer from "./Persistent"
import PermanentDrawer from "./Permanent"
import TemporaryDrawer from "./Temporary"
import EdgeHeaderOffset from "../EdgeHeaderOffset"
import { createBreakpointStyles, createHiddenStyles } from "../../utils"
import { transitionStyles } from "../../styles"
import { EdgeSidebarConfig } from "../../types"

const useTransitionStyles = makeStyles(transitionStyles)

const DrawerSidebar = ({
  onClose,
  children,
  PaperProps,
  SlideProps,
  ...props
}: Omit<DrawerProps, "variant"> & {
  sidebarId: string
}) => {
  const sidebarId = props.sidebarId
  useSidebarAutoCollapse(sidebarId)
  const transition = useTransitionStyles()
  const [entered, setEntered] = React.useState(false)
  const { breakpoints } = useTheme()
  const {
    anchor,
    edgeSidebar,
    styles: { permanent, persistent, temporary },
    state,
    setOpen,
  } = useSidebar(sidebarId)
  const wrappedOnClose: DrawerProps["onClose"] = (...args) => {
    if (typeof onClose === "function") onClose(...args)
    setOpen(sidebarId, false)
  }
  const config = useBreakpointConfig<EdgeSidebarConfig>(
    edgeSidebar.configMapById[sidebarId]
  )
  const commonProps = {
    ...props,
    PaperProps: {
      ...PaperProps,
      className: cx(
        (entered || config?.variant === "permanent") && transition.root,
        PaperProps?.className
      ),
    },
    SlideProps: {
      ...SlideProps,
      // @ts-ignore
      onEntered: (...args) => {
        // @ts-ignore
        SlideProps?.onEntered?.(...args)
        setEntered(true)
      },
      // @ts-ignore
      onExit: arg => {
        SlideProps?.onExit?.(arg)
        setEntered(false)
      },
    },
    anchor,
    open: state.open,
    onClose: wrappedOnClose,
  }

  const headerAdjustment = <EdgeHeaderOffset sidebarId={sidebarId} />

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
