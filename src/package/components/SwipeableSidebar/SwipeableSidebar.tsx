import React from "react"
import cx from "clsx"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { SwipeableDrawerProps } from "@material-ui/core/SwipeableDrawer"
import PersistentSwipeableDrawer from "./Persistent"
import PermanentSwipeableDrawer from "./Permanent"
import TemporarySwipeableDrawer from "./Temporary"
import { useSidebar, SidebarProvider } from "../../core"
import { useBreakpointConfig, useSidebarAutoCollapse } from "../../core/hooks"
import { createBreakpointStyles, createHiddenStyles } from "../../utils"
import EdgeHeaderOffset from "../EdgeHeaderOffset"
import { transitionStyles } from "../../styles"
import { EdgeSidebarConfig } from "../../types"

const useTransitionStyles = makeStyles(transitionStyles)

const SwipeableSidebar = ({
  onClose,
  onOpen,
  children,
  PaperProps,
  SlideProps,
  ...props
}: Omit<SwipeableDrawerProps, "variant" | "open" | "onClose" | "onOpen"> & {
  sidebarId: string
  onClose?: SwipeableDrawerProps["onClose"]
  onOpen?: SwipeableDrawerProps["onOpen"]
}) => {
  const { sidebarId } = props
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
  } = useSidebar(sidebarId, "SwipeableDrawer")
  const wrappedOnOpen: SwipeableDrawerProps["onOpen"] = (...args) => {
    if (typeof onOpen === "function") onOpen(...args)
    setOpen(sidebarId, true)
  }
  const wrappedOnClose: SwipeableDrawerProps["onClose"] = (...args) => {
    if (typeof onOpen === "function") onClose(...args)
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
