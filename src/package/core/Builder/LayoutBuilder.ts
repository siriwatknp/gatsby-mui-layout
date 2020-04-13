import HeaderBuilder from "./Header/HeaderBuilder"
import SidebarBuilder from "./Sidebar/SidebarBuilder"
import {
  IHeaderBuilder,
  ISidebarBuilder,
  State,
  ResultStyle,
} from "../../types"

interface BuilderCallback<T> {
  (builder: T): void
}

export interface ILayoutBuilder {
  configureHeader: (callback: BuilderCallback<IHeaderBuilder>) => void
  configureSidebar: (callback: BuilderCallback<ISidebarBuilder>) => void
  getComponentStyle: (
    state: State
  ) => {
    header: ResultStyle
  }
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
    getComponentStyle: (state: State) => ({
      header: header.getResultStyle(state, sidebar),
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
