import React from "react"
import styled from "styled-components"
import Drawer, { DrawerProps } from "@material-ui/core/Drawer"
import { MediaQueries } from "../../utils/createBreakpointStyles"
import { ContextValue, SidebarState, SidebarVariant } from "../../types"
import { upperFirst } from "../../utils"
import { useLayoutCtx } from "../../core/Context"

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
  (
    variant: SidebarVariant,
    getProps?: (
      sidebarUtils: Pick<ContextValue, "setOpen" | "setCollapsed"> & {
        state: SidebarState
        id: string
      }
    ) => Partial<SharedSidebarProps>
  ): React.FC<SharedSidebarProps & { state: SidebarState }>
}

const createDrawerSidebar: CreateSidebar = (variant, getProps) => {
  const Sidebar = ({
    PaperProps = {},
    state,
    styles,
    hiddenStyles,
    ...props
  }: SharedSidebarProps & { state: SidebarState }) => {
    const utils = useLayoutCtx()
    return (
      <StyledDrawer
        {...props}
        {...(getProps && getProps({ ...utils, id: props.id, state }))}
        open={state.open}
        styles={styles}
        hiddenStyles={hiddenStyles}
        PaperProps={{
          ...PaperProps,
          className: `${CLS} ${PaperProps.className}`,
        }}
        variant={variant}
      />
    )
  }

  Sidebar.displayName = `${upperFirst(variant)}DrawerSidebar`
  return Sidebar
}

export default createDrawerSidebar
