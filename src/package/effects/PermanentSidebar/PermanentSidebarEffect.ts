import { upperFirst } from "../../utils"
import createWidthInterface from "../../models/Width"
import createMarginInterface from "../../models/Margin"
import {
  IMargin,
  ISidebarEffect,
  IWidth,
  PermanentSidebarConfig,
  State,
} from "../../types"
import createEdgeModel from "../../models/Sidebar/Edge/EdgeSidebarModel"

export default (
  config: PermanentSidebarConfig,
  state?: State
): ISidebarEffect => {
  const { anchor } = config
  const { width: currentWidth } = createEdgeModel(config, state)
  const marginAttr = `margin${upperFirst(anchor)}`
  return {
    id: config.id,
    getObjectWidth: (): IWidth => createWidthInterface(currentWidth),
    getObjectMargin: (): IMargin =>
      createMarginInterface({
        [marginAttr]: currentWidth,
      }),
  }
}
