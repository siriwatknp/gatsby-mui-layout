import createModel from './HeaderEffect';
import {
  ISidebarEffect,
  HeaderConfig,
} from "../../types"

type HeaderDependencies = {
  sidebarEffect: ISidebarEffect
}

export default (
  config: HeaderConfig,
  { sidebarEffect }: HeaderDependencies
) => {
  const headerEffect = createModel(config);
  return {
    getStyle: () => ({
      ...sidebarEffect.getObjectWidth(config.id).getStyle(),
      ...sidebarEffect.getObjectMargin(config.id).getStyle(),
      ...headerEffect.getHeaderZIndex(),
    }),
  }
}
