import React from "react"
import styled from "styled-components"
import Drawer, { DrawerProps } from "@material-ui/core/Drawer"
import { MediaQueries } from "../../utils/createBreakpointStyles"
import { SidebarState, SidebarVariant, SidebarVariantStyle } from "../../types"
import { upperFirst } from "../../utils"

const CLS = "MuiTreasury-paper"

export type SharedSidebarProps = {
  styles: MediaQueries
  hiddenStyles?: MediaQueries
} & DrawerProps

const ProxyEdgeSidebar = ({
  hiddenStyles,
  styles,
  ...props
}: SharedSidebarProps) => <Drawer {...props} />

const StyledDrawer = styled(ProxyEdgeSidebar)<{
  styles: MediaQueries
  hiddenStyles: MediaQueries
}>(({ styles, hiddenStyles }) => ({
  ...hiddenStyles,
  [`& .${CLS}`]: styles,
}))

interface CreateSidebar {
  (variant: SidebarVariant): React.FC<
    SharedSidebarProps & { state: SidebarState }
  >
}

const createDrawerSidebar: CreateSidebar = variant => {
  const Sidebar = ({
    PaperProps = {},
    state,
    styles,
    hiddenStyles,
    ...props
  }: SharedSidebarProps & { state: SidebarState }) => (
    <StyledDrawer
      open={state.open}
      styles={styles}
      hiddenStyles={hiddenStyles}
      PaperProps={{
        ...PaperProps,
        className: `${CLS} ${PaperProps.className}`,
      }}
      {...props}
      variant={variant}
    />
  )

  Sidebar.displayName = `${upperFirst(variant)}DrawerSidebar`
  return Sidebar
}

export default createDrawerSidebar
