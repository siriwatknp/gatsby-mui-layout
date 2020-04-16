import { Dictionary, MapBreakpoint } from "./Utils"

export type MarginStyle = {
  marginLeft?: string | number
  marginRight?: string | number
}

export type WidthStyle = {
  width: string | number
}

export type ZIndexStyle = {
  zIndex: number
}

export type ResultStyle = MapBreakpoint<Dictionary<string | number>>

export type SidebarVariantStyle = {
  persistent: ResultStyle
  permanent: ResultStyle
}

export type SidebarResultStyle = Dictionary<SidebarVariantStyle>

