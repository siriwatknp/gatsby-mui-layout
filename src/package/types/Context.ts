import { ComponentStyle } from "../core/Builder"
import { LayoutConfig } from "./Config"

export type SidebarState = {
  collapsed?: boolean
  open?: boolean
}

export type SidebarStateById = {
  [key: string]: SidebarState
}

export type State = {
  sidebar: SidebarStateById
}

interface ISidebarTrigger {
  (id: string, value: boolean): void
}

export type ContextValue = {
  state: State
  styles: ComponentStyle
  config: LayoutConfig
  setOpen: ISidebarTrigger
  setCollapsed: ISidebarTrigger
}
