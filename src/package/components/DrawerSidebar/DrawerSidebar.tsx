import React from "react"
import useTheme from "@material-ui/core/styles/useTheme"
import { useSidebar } from "../../core/Context"
import PersistentDrawer from "./Persistent"
import PermanentDrawer from "./Permanent"
import {
  createBreakpointStyles,
  createDisplayNone,
  createHiddenStyles,
} from "../../utils"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { DrawerProps } from "@material-ui/core"

const useStyles = makeStyles(
  ({ breakpoints }) => ({
    root: ({ hiddenBreakpoints }: { hiddenBreakpoints?: Breakpoint[] }) =>
      createDisplayNone(hiddenBreakpoints, breakpoints),
  }),
  { name: "DrawerSidebar" }
)

const DrawerSidebar = ({
  hiddenBreakpoints,
  ...props
}: DrawerProps & {
  id: string
  hiddenBreakpoints: Breakpoint[]
}) => {
  const { breakpoints } = useTheme()
  const classes = useStyles({ hiddenBreakpoints, ...props })
  const {
    styles: { permanent, persistent },
    state,
  } = useSidebar(props.id)

  return (
    <>
      <PersistentDrawer
        {...props}
        classes={classes}
        state={state}
        hiddenStyles={createHiddenStyles(persistent, [permanent], breakpoints)}
        styles={createBreakpointStyles(persistent, breakpoints)}
      />
      <PermanentDrawer
        {...props}
        classes={classes}
        state={state}
        hiddenStyles={createHiddenStyles(permanent, [persistent], breakpoints)}
        styles={createBreakpointStyles(permanent, breakpoints)}
      />
    </>
  )
}

export default DrawerSidebar
