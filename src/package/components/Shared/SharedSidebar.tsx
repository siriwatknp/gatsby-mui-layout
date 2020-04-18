import React from "react"
import Drawer, { DrawerProps } from "@material-ui/core/Drawer"
import SwipeableDrawer, {
  SwipeableDrawerProps,
} from "@material-ui/core/SwipeableDrawer"
import { ContextValue, SidebarState, SidebarVariant } from "../../types"
import { upperFirst } from "../../utils"
import { useLayoutCtx } from "../../core/Context"
import createHiddenProxyComponent, { HiddenProxyProps } from "./HiddenProxy"

const CLS = "MuiTreasury-paper"

const StyledProxyDrawer = createHiddenProxyComponent<DrawerProps>(Drawer, CLS)
const StyledProxySwipeableDrawer = createHiddenProxyComponent<
  SwipeableDrawerProps
>(SwipeableDrawer, CLS)

export type StyledProxyDrawerProps = DrawerProps & HiddenProxyProps
export type StyledProxySwipeableDrawerProps = SwipeableDrawerProps &
  HiddenProxyProps
type SidebarProps = StyledProxyDrawerProps | StyledProxySwipeableDrawerProps

interface CreateSidebar {
  (
    variant: SidebarVariant,
    getProps?: (
      sidebarUtils: Pick<ContextValue, "setOpen" | "setCollapsed"> & {
        state: SidebarState
        id: string
      }
    ) => Partial<SidebarProps>
  ): React.FC<SidebarProps & { state: SidebarState }>
}

function generateSidebarCreator(
  WrappedComponent: React.ComponentType<SidebarProps>
) {
  const createSidebar: CreateSidebar = (variant, getProps) => {
    const Sidebar: React.FC<SidebarProps & { state: SidebarState }> = ({
      PaperProps = {},
      state,
      styles,
      hiddenStyles,
      ...props
    }) => {
      const utils = useLayoutCtx()
      return (
        <WrappedComponent
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
  return createSidebar
}

export const createDrawerSidebar = generateSidebarCreator(StyledProxyDrawer)
export const createSwipeableDrawerSidebar = generateSidebarCreator(
  StyledProxySwipeableDrawer
)
