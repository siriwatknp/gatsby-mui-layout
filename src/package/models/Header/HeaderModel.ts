import createModel from './HeaderEffect';
import {
  SidebarEffect,
  HeaderConfig,
} from "../../types"

type HeaderDependencies = {
  sidebarEffect: SidebarEffect
}

export default (
  config: HeaderConfig,
  { sidebarEffect }: HeaderDependencies
) => {
  const headerEffect = createModel(config);
  return {
    getStyle: () => ({
      ...sidebarEffect.getObjectWidth(config.id).getStyle(),
      ...sidebarEffect.getObjectMargin(config.id),
      ...headerEffect.getHeaderZIndex(),
    }),
  }
}
