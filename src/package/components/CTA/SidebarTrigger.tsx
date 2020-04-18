import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton"
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeftRounded"
import ArrowRight from "@material-ui/icons/KeyboardArrowRightRounded"
import MenuRounded from "@material-ui/icons/MenuRounded"
import { useSidebarCta } from "../../core/Context"
import { createHiddenStyles } from "../../utils"
import { CtaProps } from "../../types"
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

const SidebarTrigger = ({
  children,
  sidebarId,
  onClick,
  SvgIconProps,
  ...props
}: IconButtonProps & CtaProps) => {
  const classes = useStyles(props)
  const {
    id,
    anchor,
    breakpoints,
    state,
    setOpen,
    styles: { permanent, persistent, temporary },
  } = useSidebarCta(sidebarId, "SidebarTrigger")
  const getArrow = () => {
    if (!state.open) return <MenuRounded {...SvgIconProps} />
    if (anchor === "left") return <ArrowLeft {...SvgIconProps} />
    if (anchor === "right") return <ArrowRight {...SvgIconProps} />
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
