import HeaderBuilder from "./Header/HeaderBuilder"
import SidebarBuilder from "./Sidebar/SidebarBuilder"
import {
  IHeaderBuilder,
  ISidebarBuilder,
  State,
  ResultStyle,
  SidebarResultStyle, LayoutConfig,
} from "../../types"

interface BuilderCallback<T> {
  (builder: T): void
}

export type ComponentStyle = {
  header: ResultStyle
  sidebar: SidebarResultStyle
}

export interface ILayoutBuilder {
  configureHeader: (callback: BuilderCallback<IHeaderBuilder>) => void
  configureSidebar: (callback: BuilderCallback<ISidebarBuilder>) => void
  getComponentStyle: (state: State) => ComponentStyle
  getComponentConfig: () => LayoutConfig
  getInitialState: () => State
}

export default (): ILayoutBuilder => {
  const header = HeaderBuilder()
  const sidebar = SidebarBuilder()

  return {
    configureHeader(callback) {
      callback(header)
    },
    configureSidebar(callback) {
      callback(sidebar)
    },
    getComponentConfig: () => ({
      header: header.getConfig(),
      sidebar: sidebar.getConfig(),
      sidebarById: sidebar.getConfigMapById()
    }),
    getComponentStyle: (state: State) => ({
      header: header.getResultStyle(state, sidebar),
      sidebar: sidebar.getResultStyle(state, header),
    }),
    getInitialState: () => {
      const sidebarIds = sidebar.getSidebarIds()
      return {
        sidebar: sidebarIds.reduce(
          (result, curr) => ({
            ...result,
            [curr]: { open: false, collapsed: false },
          }),
          {}
        ),
      }
    },
  }
}
