import React from "react"
import useTheme from "@material-ui/core/styles/useTheme"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { DrawerProps } from "@material-ui/core/Drawer"
import { useSidebar, SidebarProvider } from "../../core/Context"
import PersistentDrawer from "./Persistent"
import PermanentDrawer from "./Permanent"
import TemporaryDrawer from "./Temporary"
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

const DrawerSidebar = ({
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
  } = useSidebar(props.id)
  const anchor = getSidebarAnchor(config)
  const commonProps = {
    ...props,
    anchor,
    classes,
    state,
  }

  return (
    <SidebarProvider id={props.id}>
      <TemporaryDrawer
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
