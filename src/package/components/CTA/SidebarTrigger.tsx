import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton"
import { SvgIconProps } from "@material-ui/core/SvgIcon"
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeftRounded"
import ArrowRight from "@material-ui/icons/KeyboardArrowRightRounded"
import MenuRounded from "@material-ui/icons/MenuRounded"
import { useSidebarCtx, useSidebar } from "../../core/Context"
import { createHiddenStyles, getSidebarAnchor } from "../../utils"
import { DrawerAnchor } from "../../types"
import createHiddenProxyComponent from "../Shared/HiddenProxy"

const useStyles = makeStyles(
  ({ spacing }) => ({
    root: {
      marginLeft: spacing(-1),
      marginRight: spacing(1),
    },
  }),
  { name: "SidebarTrigger" }
)

const StyledProxyIconBtn = createHiddenProxyComponent<IconButtonProps>(
  IconButton
)

interface FunctionChildren {
  (props: {
    open?: boolean
    collapsed?: boolean
    anchor: DrawerAnchor
  }): React.ReactNode
}

const SidebarTrigger = ({
  children,
  sidebarId,
  onClick,
  SvgIconProps,
  ...props
}: IconButtonProps & {
  children?: FunctionChildren
  sidebarId?: string
  onClick?: Function
  SvgIconProps?: SvgIconProps
}) => {
  const { breakpoints } = useTheme()
  const classes = useStyles(props)
  const { id = sidebarId } = useSidebarCtx()
  const {
    state,
    setOpen,
    config,
    styles: { permanent, persistent, temporary },
  } = useSidebar(id, "SidebarTrigger")
  const anchor = getSidebarAnchor(config)
  const getArrow = () => {
    if (!state.open) {
      return <MenuRounded {...SvgIconProps} />
    }
    if (anchor === "left") {
      return <ArrowLeft {...SvgIconProps} />
    }
    if (anchor === "right") {
      return <ArrowRight {...SvgIconProps} />
    }
    return null
  }
  const hiddenStyles = createHiddenStyles(
    {
      ...persistent,
      ...temporary,
    },
    [permanent],
    breakpoints
  )
  return (
    <StyledProxyIconBtn
      {...props}
      hiddenStyles={hiddenStyles}
      classes={classes}
      onClick={e => {
        if (typeof onClick === "function") onClick(e)
        setOpen(id, !state.open)
      }}
    >
      {typeof children === "function"
        ? children({ anchor, ...state })
        : getArrow()}
    </StyledProxyIconBtn>
  )
}

export default SidebarTrigger
