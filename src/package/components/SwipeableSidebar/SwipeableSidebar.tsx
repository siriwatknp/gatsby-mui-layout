import React from "react"
import useTheme from "@material-ui/core/styles/useTheme"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { DrawerProps } from "@material-ui/core/Drawer"
import { useSidebar, SidebarProvider } from "../../core/Context"
import PersistentSwipeableDrawer from "./Persistent"
import PermanentSwipeableDrawer from "./Permanent"
import TemporarySwipeableDrawer from "./Temporary"
import {
  createBreakpointStyles,
  createDisplayNone,
  createHiddenStyles,
  getSidebarAnchor,
} from "../../utils"

const useStyles = makeStyles(
  ({ breakpoints }) => ({
    root: ({ hiddenBreakpoints }: { hiddenBreakpoints?: Breakpoint[] }) =>
      createDisplayNone(hiddenBreakpoints, breakpoints),
  }),
  { name: "DrawerSidebar" }
)

const SwipeableSidebar = ({
  hiddenBreakpoints = [],
  ...props
}: DrawerProps & {
  id: string
  hiddenBreakpoints?: Breakpoint[]
}) => {
  const { breakpoints } = useTheme()
  const classes = useStyles({ hiddenBreakpoints, ...props })
  const {
    styles: { permanent, persistent, temporary },
    state,
    config,
    setOpen,
  } = useSidebar(props.id)
  const anchor = getSidebarAnchor(config)
  const commonProps = {
    ...props,
    anchor,
    classes,
    state,
    onOpen: () => setOpen(props.id, true),
    onClose: () => setOpen(props.id, false),
  }

  return (
    <SidebarProvider id={props.id}>
      <TemporarySwipeableDrawer
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
