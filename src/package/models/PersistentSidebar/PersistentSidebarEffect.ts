import upperFirst from "../../utils/upperFirst"
import createModel from "../BaseSidebar"
import createWidthInterface from "../Width"
import createMarginInterface from "../Margin"
import {
  PersistentSidebarConfig,
  State,
  PersistentBehavior,
  IMargin,
  IWidth,
} from "../../types"

const attachOperator = (value: string | number, operator: 1 | -1) =>
  typeof value === "number"
    ? operator * value
    : `${operator.toString().substr(0, 1)}${value}`

export default (config: PersistentSidebarConfig, state: State) => {
  const { anchor } = config
  const { currentWidth } = createModel(config, state)

  const marginAttr = `margin${upperFirst(anchor)}`
  const getFlexiblePersistentBehaviorMarginValue = () => {
    if (anchor === "left") return attachOperator(currentWidth, +1)
    if (anchor === "right") return attachOperator(currentWidth, -1)
    return 0
  }

  const isBehavior = (value: PersistentBehavior, objectId: string) => {
    if (typeof config.persistentBehavior === "object") {
      return config?.persistentBehavior?.[objectId] === value
    }
    return config.persistentBehavior === value
  }

  return {
    getObjectWidth: (objectId?: string): IWidth =>
      createWidthInterface(
        state.open && isBehavior("fit", objectId) ? currentWidth : 0
      ),
    getObjectMargin: (objectId?: string): IMargin => {
      const getResult = () => {
        if (!state.open) {
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
            marginLeft: getFlexiblePersistentBehaviorMarginValue(),
          }
        }
        return { [marginAttr]: 0 }
      }
      return createMarginInterface(getResult())
    },
  }
}
