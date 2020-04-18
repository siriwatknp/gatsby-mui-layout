import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import { WidthStyle, MarginStyle, ZIndexStyle } from "./InlineStyle"
import { HeaderConfig, SidebarConfig } from "./Config"
import { State } from "./Context"
import { Dictionary, MapBreakpoint } from "./Utils"

export interface IEffectCreator<T, K> {
  (config: T, state?: State): K
}
export interface IStateEffectCreator<T> {
  (state: State): T
}

export interface ISidebarEffectCreator
  extends IEffectCreator<SidebarConfig, ISidebarEffect> {}

export interface ISidebarStateEffectCreator
  extends IStateEffectCreator<ISidebarEffect> {}

export interface ISidebarListEffect {
  marginStyle: MarginStyle
  widthStyle: WidthStyle
}

export interface ISidebarEffect {
  id: string
  getObjectWidth: (id?: string) => IWidth
  getObjectMargin: (id?: string) => IMargin
}

export interface IHeaderEffect {
  id: string
  getHeaderZIndex: (theme?: Theme) => ZIndexStyle
  getEdgeSidebarZIndex: (id?: string, theme?: Theme) => ZIndexStyle
}

export interface IWidth {
  value: number | string
  getStyle: () => WidthStyle
  combine: (w: IWidth) => IWidth
}

export interface IMargin {
  value: MarginStyle
  getStyle: () => MarginStyle
  combine: (m: IMargin) => IMargin
}
