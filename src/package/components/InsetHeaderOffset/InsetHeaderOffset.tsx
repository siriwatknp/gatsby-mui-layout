import React from "react"
import useTheme from "@material-ui/core/styles/useTheme"
import { useLayoutCtx } from "../../core/Context"
import StyledProxy from "../StyledProxy"
import InsetHeaderOffsetCompiler from "../../compilers/InsetHeaderOffsetCompiler"
import { createBreakpointStyles } from "../../utils"
import { useInsetHeaderMagnet } from "../../core/hooks/useInsetHeaderMagnet"

const InsetHeaderOffset = ({ sidebarId }: { sidebarId: string }) => {
  const { breakpoints } = useTheme()
  const { data } = useLayoutCtx()
  const compiler = InsetHeaderOffsetCompiler(data.insetSidebar, data.header)
  const styles = createBreakpointStyles(
    compiler.getResultStyle(sidebarId),
    breakpoints
  )
  const inlineStyle = useInsetHeaderMagnet(sidebarId)
  return (
    <StyledProxy
      className="InsetHeaderOffset"
      styles={styles}
      style={inlineStyle}
    />
  )
}

export default InsetHeaderOffset
