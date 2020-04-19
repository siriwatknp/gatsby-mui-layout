import React from "react"
import styled from "styled-components"
import { useFooter } from "../../core"
import { MediaQueries } from "../../utils/createBreakpointStyles"

const StyledComponent = styled("footer")(
  ({ styles }: { styles: MediaQueries }) => ({
    ...styles,
  })
)

const Footer = (props: React.PropsWithChildren<{}>) => {
  const { styles } = useFooter()
  return <StyledComponent {...props} styles={styles} />
}

export default Footer
