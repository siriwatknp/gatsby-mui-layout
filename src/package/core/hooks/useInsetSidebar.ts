import merge from "deepmerge"
import { Theme, useTheme } from "@material-ui/core/styles"
import { useLayoutCtx } from "../Context"
import InsetSidebarCompiler from "../../compilers/InsetSidebarCompiler"
import { createBreakpointStyles, createHiddenStyles } from "../../utils"

const useInsetSidebar = (id: string) => {
  const {
    data: { insetSidebar },
  } = useLayoutCtx()
  const { breakpoints } = useTheme<Theme>()
  const { root, body } = InsetSidebarCompiler(insetSidebar).getResultStyle(id)
  const hiddenRootStyles = createHiddenStyles(root, [], breakpoints)
  const hiddenBodyStyles = createHiddenStyles(body, [], breakpoints)
  return {
    rootStyles: merge(
      createBreakpointStyles(root, breakpoints),
      hiddenRootStyles
    ),
    bodyStyles: merge(
      createBreakpointStyles(body, breakpoints),
      hiddenBodyStyles
    ),
  }
}

export default useInsetSidebar