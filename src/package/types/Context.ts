export type SidebarState = {
  [key: string]: {
    collapsed?: boolean
    open?: boolean
  }
}

export type State = {
  sidebar?: SidebarState
}
