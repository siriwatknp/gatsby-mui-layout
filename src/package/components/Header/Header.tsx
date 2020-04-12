import React from "react"
import AppBar from "@material-ui/core/AppBar"
import { makeStyles } from "@material-ui/core/styles"
import { useHeader } from "../../core/Context/LayoutContext"
import { createPersistentSidebarEffect } from "../../models/PersistentSidebar"
import createBreakpointStyles from "../../utils/createBreakpointStyles"

export interface HeaderProps {}

const useStyles = makeStyles(
  ({ breakpoints }) => ({
    root: o => createBreakpointStyles(o, breakpoints),
  }),
  { name: "LayoutHeader" }
)

const Header: React.FC<HeaderProps> = props => {
  const headerConfig = {
    id: "header",
    position: "fixed" as const,
    clipped: true,
  }
  const effect1 = createPersistentSidebarEffect(
    {
      id: "primary-sidebar",
      anchor: "left",
      width: 256,
      persistentBehavior: "fit",
      collapsible: true,
      collapsedWidth: 80,
    },
    { sidebar: { "primary-sidebar": { open: true } } }
  )
  const effect2 = createPersistentSidebarEffect(
    {
      id: "secondary-sidebar",
      anchor: "right",
      width: 200,
      persistentBehavior: "none",
      collapsible: true,
      collapsedWidth: 64,
    },
    { sidebar: { "primary-sidebar": { open: true } } }
  )
  const effect3 = createPersistentSidebarEffect(
    {
      id: "primary-sidebar",
      anchor: "left",
      width: 256,
      persistentBehavior: "fit",
      collapsible: true,
      collapsedWidth: 80,
    },
    { sidebar: { "primary-sidebar": { open: true, collapsed: true } } }
  )
  const { styles } = useHeader();
  const classes = useStyles(styles);
  return <AppBar classes={classes} color={"default"} elevation={0} {...props} />
}

export default Header
