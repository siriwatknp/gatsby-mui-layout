import React from "react"
import styled from "styled-components"
import Drawer, { DrawerProps } from "@material-ui/core/Drawer"
import { MediaQueries } from "../../../utils/createBreakpointStyles"
import { SidebarState } from "../../../types"

const CLS = "MuiTreasury-paper"

const StyledDrawer = styled(Drawer)<{
  styles: MediaQueries
  hiddenStyles: MediaQueries
}>(({ styles, hiddenStyles }) => ({
  ...hiddenStyles,
  [`& .${CLS}`]: styles,
}))

export type PersistentDrawerSidebarProps = {
  state: SidebarState
  styles: MediaQueries
  hiddenStyles?: MediaQueries
} & DrawerProps

const PersistentDrawerSidebar = ({
  PaperProps = {},
  state,
  styles,
  hiddenStyles,
  ...props
}: PersistentDrawerSidebarProps) => {
  return (
    <StyledDrawer
      open={state.open}
      PaperProps={{
        ...PaperProps,
        className: `${CLS} ${PaperProps.className}`,
      }}
      {...props}
      styles={styles}
      hiddenStyles={hiddenStyles}
      variant="persistent"
    />
  )
}

export default PersistentDrawerSidebar
