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
  const compiler = InsetSidebarCompiler(insetSidebar)
  const { root, body } = compiler.getResultStyle(id)
  const variant = compiler.getVariant(id)
  const hiddenRootStyles = createHiddenStyles(root, [], breakpoints)
  const hiddenBodyStyles = createHiddenStyles(body, [], breakpoints)
  return {
    variant,
    insetSidebar,
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
