import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import HeaderBuilder from "./Header/HeaderBuilder"
import SidebarBuilder from "./Sidebar/SidebarBuilder"
import createHeaderModel from "../../models/Header"
import {
  HeaderConfig,
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
  // getConfig: () => LayoutConfig
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
    // getConfig: () =>
  }
}
