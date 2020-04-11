import React from "react"
import AppBar from "@material-ui/core/AppBar"
import { makeStyles } from "@material-ui/core/styles"
import createBreakpointStyles from "../../utils/createBreakpointStyles"

export interface HeaderProps {}

const useStyles = makeStyles(
  ({ breakpoints }) => ({
    root: o => createBreakpointStyles(o, breakpoints),
  }),
  { name: "LayoutHeader" }
)

const Header: React.FC<HeaderProps> = props => {

  const styles = useStyles({
    xs: { position: "sticky" },
    sm: { position: "fixed" },
  })
  return <AppBar classes={styles} color={"default"} elevation={0} {...props} />
}

export default Header
