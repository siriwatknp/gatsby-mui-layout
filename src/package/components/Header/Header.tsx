import React from "react"
import styled from "styled-components"
import AppBar from "@material-ui/core/AppBar"
import { useHeader } from "../../core/Context"
import { MediaQueries } from "../../utils/createBreakpointStyles"

export interface HeaderProps {}

const StyledAppBar = styled(AppBar)<{ styles: MediaQueries }>(
  ({ styles }) => styles
)

const Header: React.FC<HeaderProps> = props => {
  const { styles } = useHeader()
  return (
    <StyledAppBar styles={styles} color={"default"} elevation={0} {...props} />
  )
}

export default Header
