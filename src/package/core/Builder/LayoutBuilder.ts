import HeaderBuilder from "./Header/HeaderBuilder"
import SidebarBuilder from "./Sidebar/SidebarBuilder"
import ContentBuilder from "./Content/ContentBuilder"
import {
  IHeaderBuilder,
  ISidebarBuilder,
  State,
  ResultStyle,
  SidebarResultStyle,
  LayoutConfig,
  IContentBuilder,
} from "../../types"
import FooterBuilder from "./Footer"

interface BuilderCallback<T> {
  (builder: T): void
}

export type ComponentStyle = {
  header: ResultStyle
  sidebar: SidebarResultStyle
  content: ResultStyle
  footer: ResultStyle
}

export interface ILayoutBuilder {
  configureHeader: (callback: BuilderCallback<IHeaderBuilder>) => void
  configureSidebar: (callback: BuilderCallback<ISidebarBuilder>) => void
  configureContent: (callback: BuilderCallback<IContentBuilder>) => void
  configureFooter: (callback: BuilderCallback<IContentBuilder>) => void
  getComponentStyle: (state: State) => ComponentStyle
  getComponentConfig: () => LayoutConfig
  getInitialState: () => State
}

export default (): ILayoutBuilder => {
  const header = HeaderBuilder()
  const sidebar = SidebarBuilder()
  const content = ContentBuilder()
  const footer = FooterBuilder()

  return {
    configureHeader(callback) {
      callback(header)
    },
    configureSidebar(callback) {
      callback(sidebar)
    },
    configureContent(callback) {
      callback(content)
    },
    configureFooter(callback) {
      callback(footer)
    },
    getComponentConfig: () => ({
      header: header.getConfig(),
      sidebar: sidebar.getConfig(),
      sidebarById: sidebar.getConfigMapById(),
    }),
    getComponentStyle: (state: State) => ({
      header: header.getResultStyle(state, sidebar),
      sidebar: sidebar.getResultStyle(state, header),
      content: content.getResultStyle(state, sidebar),
      footer: footer.getResultStyle(state, sidebar),
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
