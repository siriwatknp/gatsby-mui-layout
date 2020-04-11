import { Width, Margin } from "./InlineStyle"

export interface ISidebarListEffect {
  marginStyle: Margin
  widthStyle: Width
}

export interface ISidebarEffect {
  getObjectWidth: (id?: string) => IWidth
  getObjectMargin: (id?: string) => IMargin
}

export interface IHeaderEffect {
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
