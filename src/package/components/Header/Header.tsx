import React from "react"
import AppBar, { AppBarProps } from "@material-ui/core/AppBar"
import { useHeader } from "../../core"
import createHiddenProxyComponent from "../Shared/HiddenProxy"

const StyledProxyAppBar = createHiddenProxyComponent<AppBarProps>(AppBar)

const Header: React.FC<AppBarProps> = props => {
  const { styles } = useHeader()
  return (
    <StyledProxyAppBar
      color={"default"}
      elevation={0}
      {...props}
      styles={styles}
    />
  )
}

export default Header
