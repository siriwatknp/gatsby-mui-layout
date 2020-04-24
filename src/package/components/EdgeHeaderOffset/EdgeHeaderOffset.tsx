import React from "react"
import useTheme from "@material-ui/core/styles/useTheme"
import { useLayoutCtx } from "../../core/Context"
import StyledProxy from "../StyledProxy"
import EdgeHeaderOffsetCompiler from "../../compilers/EdgeHeaderOffsetCompiler"
import { createBreakpointStyles } from "../../utils"

const EdgeHeaderOffset = ({ sidebarId }: { sidebarId: string }) => {
  const { breakpoints } = useTheme()
  const { data } = useLayoutCtx()
  const compiler = EdgeHeaderOffsetCompiler(data.edgeSidebar, data.header)
  const styles = createBreakpointStyles(
    compiler.getResultStyle(sidebarId),
    breakpoints
  )
  return <StyledProxy className="EdgeHeaderOffset" styles={styles} />
}

export default EdgeHeaderOffset
