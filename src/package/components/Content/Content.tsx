import React from "react"
import styled from "styled-components"
import { useContent } from "../../core"
import { MediaQueries } from "../../utils/createBreakpointStyles"

const StyledComponent = styled("main")(
  ({ styles }: { styles: MediaQueries }) => ({
    ...styles,
  })
)

const Content = (props: React.PropsWithChildren<{}>) => {
  const { styles } = useContent()
  return <StyledComponent {...props} styles={styles} />
}

export default Content
