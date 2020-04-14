import createModel from "../../effects/Header/HeaderEffect"
import { ISidebarEffect, HeaderConfig, IMargin, IWidth } from "../../types"

export default (config: HeaderConfig, sidebarEffects: ISidebarEffect[]) => {
  const headerEffect = createModel(config)

  const marginInterfaces: IMargin[] = []
  const widthInterfaces: IWidth[] = []

  sidebarEffects.forEach(({ id, getObjectWidth, getObjectMargin }) => {
    if (
      (typeof config.clipped === "boolean" && !config.clipped) ||
      (typeof config.clipped === "object" && config?.clipped?.[id])
    ) {
      widthInterfaces.push(getObjectWidth(config.id))
      marginInterfaces.push(getObjectMargin(config.id))
    }
  })
  const marginStyle =
    marginInterfaces.length > 0
      ? marginInterfaces
          .reduce((result, current) => result.combine(current))
          .getStyle()
      : undefined
  const widthStyle =
    widthInterfaces.length > 0
      ? widthInterfaces
          .reduce((result, current) => result.combine(current))
          .getStyle()
      : undefined
  return {
    getStyle: () => ({
      ...marginStyle,
      ...widthStyle,
      ...headerEffect.getHeaderZIndex(),
    }),
  }
}
