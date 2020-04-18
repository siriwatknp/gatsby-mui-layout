import React from "react"
import Drawer, { DrawerProps } from "@material-ui/core/Drawer"
import { ContextValue, SidebarState, SidebarVariant } from "../../types"
import { upperFirst } from "../../utils"
import { useLayoutCtx } from "../../core/Context"
import createHiddenProxyComponent, { HiddenProxyProps } from "./HiddenProxy"

const CLS = "MuiTreasury-paper"

const StyledProxyDrawer = createHiddenProxyComponent<DrawerProps>(Drawer, CLS)

export type SharedSidebarProps = DrawerProps & HiddenProxyProps

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
      <StyledProxyDrawer
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
