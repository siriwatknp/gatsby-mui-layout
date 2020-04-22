import { useLayoutCtx } from "../Context"
import { getSidebarAnchor } from "../../utils"
import EdgeSidebarCompiler from "../../compilers/EdgeSidebarCompiler"

const useSidebar = (id: string, consumer?: string) => {
  if (!id) {
    throw new Error(`You must specify a sidebar id to <${consumer} />`)
  }
  const { state, config, data, setOpen, setCollapsed } = useLayoutCtx()
  const anchor = getSidebarAnchor(config.sidebarById[id])
  const styles = EdgeSidebarCompiler(
    state,
    data.edgeSidebar,
    config.header
  ).getResultStyle(id)
  return {
    anchor,
    state: state.sidebar[id],
    styles,
    setOpen,
    setCollapsed,
  }
}

export default useSidebar
