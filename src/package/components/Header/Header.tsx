import React from "react"
import AppBar from "@material-ui/core/AppBar"
import { makeStyles } from "@material-ui/core/styles"
import { createPersistentSidebarEffect } from "../../models/PersistentSidebar"
import createModel from "../../models/Header"
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
    { open: true, collapsed: false }
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
    { open: true, collapsed: true }
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
    { open: true, collapsed: true }
  )
  const xsModel = createModel(headerConfig, [effect1, effect2])
  const mdModel = createModel(headerConfig, [effect3, effect2])
  const styles = useStyles({
    xs: xsModel.getStyle(),
    md: mdModel.getStyle()
  })
  return <AppBar classes={styles} color={"default"} elevation={0} {...props} />
}

export default Header
