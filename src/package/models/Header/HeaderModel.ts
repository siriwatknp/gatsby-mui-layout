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
  // const marginStyle = sidebars.reduce((result, curr) => {
  //   // todo: refactor type guard here
  //   if (typeof config.persistentBehavior === "object") {
  //     const value = config.persistentBehavior[curr.id]
  //     if (!value) {
  //       throw new Error(
  //         `Cannot find Header\'s persistentBehavior for id: ${curr.id}`
  //       )
  //     }
  //     return curr.getMarginEffect({
  //       persistentBehavior: value,
  //     })
  //   }
  //   return curr.getMarginEffect({
  //     persistentBehavior: config.persistentBehavior,
  //   })
  // }, {})
  return {
    getStyle: () => ({
      ...sidebarEffect.getObjectWidth(config.id),
      ...sidebarEffect.getObjectMargin(config.id),
      ...headerEffect.getHeaderZIndex(),
    }),
  }
}
