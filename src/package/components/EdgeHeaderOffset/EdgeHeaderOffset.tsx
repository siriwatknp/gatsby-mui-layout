import React from "react"
import useTheme from "@material-ui/core/styles/useTheme"
import { useLayoutCtx } from "../../core/Context"
import StyledProxy from "../StyledProxy"
import EdgeHeaderOffsetCompiler from "../../compilers/EdgeHeaderOffsetCompiler"
import { createBreakpointStyles } from "../../utils"
import useEdgeHeaderMagnet from "../../core/hooks/useEdgeHeaderMagnet"

const EdgeHeaderOffset = ({ sidebarId }: { sidebarId: string }) => {
  const { breakpoints } = useTheme()
  const { data } = useLayoutCtx()
  const compiler = EdgeHeaderOffsetCompiler(data.edgeSidebar, data.header)
  const styles = createBreakpointStyles(
    compiler.getResultStyle(sidebarId),
    breakpoints
  )
  const inlineStyle = useEdgeHeaderMagnet(sidebarId)
  return (
    <StyledProxy
      className="EdgeHeaderOffset"
      styles={styles}
      style={inlineStyle}
    />
  )
}

export default EdgeHeaderOffset
