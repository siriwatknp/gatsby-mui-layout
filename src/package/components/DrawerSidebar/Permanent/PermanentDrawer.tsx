import React from "react"
import styled from "styled-components"
import Drawer, { DrawerProps } from "@material-ui/core/Drawer/Drawer"
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

export type PermanentDrawerSidebarProps = {
  state: SidebarState
  styles: MediaQueries
  hiddenStyles?: MediaQueries
} & DrawerProps

const PermanentDrawer = ({
  PaperProps = {},
  state,
  styles,
  hiddenStyles,
  ...props
}: PermanentDrawerSidebarProps) => {
  return (
    <StyledDrawer
      PaperProps={{
        ...PaperProps,
        className: `${CLS} ${PaperProps.className}`,
      }}
      {...props}
      styles={styles}
      hiddenStyles={hiddenStyles}
      variant="permanent"
    />
  )
}

export default PermanentDrawer
