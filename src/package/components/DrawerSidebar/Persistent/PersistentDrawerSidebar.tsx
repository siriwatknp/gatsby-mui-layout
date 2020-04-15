import React from "react"
import { DrawerProps } from "@material-ui/core/Drawer"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import styled from "styled-components"
import Drawer from "@material-ui/core/Drawer"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { useSidebar } from "../../../core/Context"
import { MediaQueries } from "../../../utils/createBreakpointStyles"
import { createDisplayNone } from "../../../utils"

const CLS = "MuiTreasury-paper"

const StyledDrawer = styled(Drawer)<{ styles: MediaQueries }>(({ styles }) => ({
  [`& .${CLS}`]: styles,
}))

const useStyles = makeStyles(({ breakpoints }) => {
  return {
    root: ({ hiddenBreakpoints }: { hiddenBreakpoints?: Breakpoint[] }) =>
      createDisplayNone(hiddenBreakpoints, breakpoints),
  }
})

export type PersistentDrawerSidebarProps = {
  id: string
  hiddenBreakpoints?: Breakpoint[]
} & DrawerProps

const PersistentDrawerSidebar = ({
  id,
  PaperProps = {},
  ...props
}: PersistentDrawerSidebarProps) => {
  const { state, styles } = useSidebar(id, "persistent")
  const classes = useStyles(props)
  return (
    <StyledDrawer
      open={state.open}
      classes={classes}
      styles={styles}
      PaperProps={{
        ...PaperProps,
        className: `${CLS} ${PaperProps.className}`,
      }}
      {...props}
      variant="persistent"
    />
  )
}

export default PersistentDrawerSidebar
