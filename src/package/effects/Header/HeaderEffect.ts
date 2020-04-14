import { Theme } from "@material-ui/core/styles"
import { HeaderConfig, IHeaderEffect } from "../../types"

type HeaderPartial = Pick<HeaderConfig, "id" | "position" | "clipped">

const incrementZIndex = (theme: Theme, plus: number) => ({
  zIndex: (theme?.zIndex?.drawer ?? 1200) + plus,
})

export const isSomeClipped = ({ clipped }: Pick<HeaderConfig, "clipped">) => {
  if (typeof clipped === "boolean") {
    return clipped
  }
  if (typeof clipped === "object") {
    return Object.values(clipped).some(value => !!value)
  }
  return false
}

export default (header: HeaderPartial): IHeaderEffect => {
  const isAboveSomeSidebars =
    header.position !== "static" && isSomeClipped(header)

  return {
    id: header.id,
    getHeaderZIndex: (theme?: Theme) =>
      isAboveSomeSidebars ? incrementZIndex(theme, 10) : undefined,
    getEdgeSidebarZIndex: (sidebarId: string, theme?: Theme) =>
      isAboveSomeSidebars &&
      ((typeof header.clipped === "boolean" && !header.clipped) ||
        (typeof header.clipped === "object" &&
          typeof header.clipped?.[sidebarId] !== "undefined" &&
          !header.clipped?.[sidebarId]))
        ? incrementZIndex(theme, 20)
        : undefined,
  }
}
