import React from "react"
import styled from "styled-components"
import AppBar, { AppBarProps } from "@material-ui/core/AppBar"
import { useHeader } from "../../core/Context"
import { MediaQueries } from "../../utils/createBreakpointStyles"

const ProxyHeader = ({
  styles,
  ...props
}: AppBarProps & { styles: MediaQueries }) => <AppBar {...props} />

const StyledAppBar = styled(ProxyHeader)<{ styles: MediaQueries }>(
  ({ styles }) => styles
)

const Header: React.FC<AppBarProps> = props => {
  const { styles } = useHeader()
  return (
    <StyledAppBar color={"default"} elevation={0} {...props} styles={styles} />
  )
}

export default Header
