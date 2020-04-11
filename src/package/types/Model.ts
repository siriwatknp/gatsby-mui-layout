import { Width, Margin } from "./InlineStyle"

export interface SidebarEffect {
  getObjectWidth: Function
  getObjectMargin: Function
}

export interface HeaderEffect {
  getHeaderZIndex: Function
  getEdgeSidebarZIndex: Function
}

export interface IWidth {
  value: number | string
  getStyle: () => Width
  combine: (w: IWidth) => IWidth
}

export interface IMargin {
  value: Margin
  getStyle: () => Margin
  combine: (m: IMargin) => IMargin
}
