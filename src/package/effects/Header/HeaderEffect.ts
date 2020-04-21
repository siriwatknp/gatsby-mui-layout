import { Theme } from "@material-ui/core/styles"
import { HeaderConfig, IHeaderEffect } from "../../types"
import { toValidCssValue } from "../../utils"

const incrementZIndex = (theme: Theme, plus: number) => ({
  zIndex: (theme?.zIndex?.drawer ?? 1200) + plus,
})

const calc = (...args: (string | number)[]) =>
  `calc(${args.map(toValidCssValue).join(" - ")})`

export const isSomeClipped = ({ clipped }: Pick<HeaderConfig, "clipped">) => {
  if (typeof clipped === "boolean") {
    return clipped
  }
  if (typeof clipped === "object") {
    return Object.values(clipped).some(value => !!value)
  }
  return false
}

export default (header: Partial<HeaderConfig>): IHeaderEffect => {
  const isAboveSomeSidebars = isSomeClipped(header)
  const isObjectClipped = (sidebarId?: string) =>
    (typeof header.clipped === "boolean" && header.clipped) ||
    (typeof header.clipped === "object" && header.clipped?.[sidebarId])
  return {
    id: header.id,
    getHeaderZIndex: (theme?: Theme) =>
      isAboveSomeSidebars ? incrementZIndex(theme, 10) : undefined,
    getEdgeSidebarZIndex: (sidebarId: string, theme?: Theme) =>
      isAboveSomeSidebars && !isObjectClipped(sidebarId)
        ? incrementZIndex(theme, 20)
        : undefined,
    resolveHeight: (height, { objectId, clippable } = {}) => {
      const isClipped = isObjectClipped(objectId)
      if (clippable) {
        if (isClipped) return height
        return 0
      }
      if (["absolute", "fixed"].includes(header.position)) {
        return height
      }
      return 0
    },
    getInitialHeight(options = {}) {
      return this.resolveHeight(options.height || header.initialHeight, options)
    },
    getUpdatedHeight(options = {}) {
      const baseHeight = this.getInitialHeight(options)
      const offsetHeight = this.getOffsetHeight(options)
      return calc(baseHeight, offsetHeight)
    },
    getOffsetHeight({ objectId, clippable, scrollY = 0 } = {}){
      const isClipped = isObjectClipped(objectId)
      if (clippable && isClipped && header.position === "relative")
        return scrollY
      return 0
    },
  }
}
