import React from "react"
import styled from "styled-components"
import { useTheme } from "@material-ui/core/styles"
import { useLayoutCtx } from "../../core"
import { MediaQueries } from "../../utils/createBreakpointStyles"
import { createBreakpointStyles } from "../../utils"
import ContentCompiler from "../../compilers/ContentCompiler"

const StyledComponent = styled("main")(
  ({ styles }: { styles: MediaQueries }) => ({
    ...styles,
  })
)

const Content = (props: React.PropsWithChildren<{}>) => {
  const { breakpoints } = useTheme()
  const { data, state } = useLayoutCtx()
  const styles = createBreakpointStyles(
    ContentCompiler(state, data.edgeSidebar).getResultStyle(data.content.id),
    breakpoints
  )
  return <StyledComponent {...props} styles={styles} />
}

export default Content
