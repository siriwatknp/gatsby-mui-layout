import HeaderBuilder from "./Header"
import SidebarBuilder from "./EdgeSidebar"
import ContentBuilder from "./Content"
import FooterBuilder from "./Footer"
import InsetBuilder from "./InsetSidebar"
import {
  IHeaderBuilder,
  IEdgeSidebarBuilder,
  State,
  LayoutConfig,
  IContentBuilder,
  GlobalConfig,
  ILayoutConfig, IFooterBuilder,
} from "../types"
import { IInsetSidebarBuilder } from "./InsetSidebar/InsetSidebarBuilder"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"

interface BuilderCallback<T> {
  (builder: T): void
}

export interface ILayoutBuilder {
  configureHeader: (callback: BuilderCallback<IHeaderBuilder>) => void
  configureSidebar: (callback: BuilderCallback<IEdgeSidebarBuilder>) => void
  configureInset: (callback: BuilderCallback<IInsetSidebarBuilder>) => void
  configureContent: (callback: BuilderCallback<IContentBuilder>) => void
  configureFooter: (callback: BuilderCallback<IFooterBuilder>) => void
  enableAutoCollapse: (sidebarId: string, breakpoint?: Breakpoint) => void
  getComponentData: () => ILayoutConfig
  getComponentConfig: () => LayoutConfig
  getInitialState: () => State
}

export default (): ILayoutBuilder => {
  const global: GlobalConfig = {
    autoCollapse: {},
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
    getComponentData: () => ({
      edgeSidebar: sidebar.getData(),
      insetSidebar: inset.getData(),
      header: header.getData(),
      content: content.getData(),
      footer: footer.getData()
    }),
    getComponentConfig: () => ({
      header: header.getConfig(),
      sidebar: sidebar.getConfig(),
      sidebarById: sidebar.getConfigMapById(),
      inset: inset.getConfig(),
      global,
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
