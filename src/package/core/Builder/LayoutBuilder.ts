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
  InsetSidebarResultStyle,
  Dictionary, GlobalConfig,
} from "../../types"
import FooterBuilder from "./Footer"
import InsetBuilder from "./Inset"
import { IInsetBuilder } from "./Inset/InsetBuilder"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"

interface BuilderCallback<T> {
  (builder: T): void
}

export type ComponentStyle = {
  header: ResultStyle
  sidebar: SidebarResultStyle
  content: ResultStyle
  footer: ResultStyle
  inset: Dictionary<InsetSidebarResultStyle>
}

export interface ILayoutBuilder {
  configureHeader: (callback: BuilderCallback<IHeaderBuilder>) => void
  configureSidebar: (callback: BuilderCallback<ISidebarBuilder>) => void
  configureInset: (callback: BuilderCallback<IInsetBuilder>) => void
  configureContent: (callback: BuilderCallback<IContentBuilder>) => void
  configureFooter: (callback: BuilderCallback<IContentBuilder>) => void
  enableAutoCollapse: (sidebarId: string, breakpoint?: Breakpoint) => void
  getComponentStyle: (state: State) => ComponentStyle
  getComponentConfig: () => LayoutConfig
  getInitialState: () => State
}

export default (): ILayoutBuilder => {
  const global: GlobalConfig = {
    autoCollapse: {}
  }
  const header = HeaderBuilder()
  const sidebar = SidebarBuilder()
  const content = ContentBuilder()
  const footer = FooterBuilder()
  const inset = InsetBuilder()

  return {
    configureHeader(callback) {
      callback(header)
    },
    configureSidebar(callback) {
      callback(sidebar)
    },
    configureInset(callback) {
      callback(inset)
    },
    configureContent(callback) {
      callback(content)
    },
    configureFooter(callback) {
      callback(footer)
    },
    enableAutoCollapse(sidebarId, breakpoint = "md") {
      global.autoCollapse[sidebarId] = breakpoint
    },
    getComponentConfig: () => ({
      header: header.getConfig(),
      sidebar: sidebar.getConfig(),
      sidebarById: sidebar.getConfigMapById(),
      inset: inset.getConfig(),
      global
    }),
    getComponentStyle: (state: State) => ({
      header: header.getResultStyle(state, sidebar),
      sidebar: sidebar.getResultStyle(state, header),
      content: content.getResultStyle(state, sidebar),
      footer: footer.getResultStyle(state, sidebar),
      inset: inset.getResultStyle(),
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
