import { upperFirst, getFlexBehaviorValue } from "../../utils"
import createEdgeModel from "../../models/Sidebar/Edge"
import createWidthInterface from "../../models/Width"
import createMarginInterface from "../../models/Margin"
import {
  PersistentSidebarConfig,
  State,
  PersistentBehavior,
  IMargin,
  IWidth,
  ISidebarEffect,
} from "../../types"

export default (
  config: PersistentSidebarConfig,
  state?: State
): ISidebarEffect => {
  const { anchor } = config
  const { width: currentWidth } = createEdgeModel(config, state)

  const marginAttr = `margin${upperFirst(anchor)}`

  const isBehavior = (value: PersistentBehavior, objectId: string) => {
    if (typeof config.persistentBehavior === "object") {
      return config?.persistentBehavior?.[objectId] === value
    }
    return config.persistentBehavior === value
  }

  const isSidebarOpen = state?.sidebar?.[config.id]?.open
  return {
    id: config.id,
    getObjectWidth: (objectId?: string): IWidth =>
      createWidthInterface(
        isSidebarOpen && isBehavior("fit", objectId) ? currentWidth : 0
      ),
    getObjectMargin: (objectId?: string): IMargin => {
      const getResult = () => {
        if (!isSidebarOpen) {
          return {
            [marginAttr]: 0,
          }
        }

        // open is true
        if (isBehavior("fit", objectId)) {
          return {
            [marginAttr]: currentWidth,
          }
        }
        if (isBehavior("flexible", objectId)) {
          // for flexible, only marginLeft works. You can try using marginRight.
          // May be it is because normally browser is LTR
          return {
            marginLeft: getFlexBehaviorValue(config.anchor, currentWidth),
          }
        }
        return { [marginAttr]: 0 }
      }
      return createMarginInterface(getResult())
    },
  }
}
