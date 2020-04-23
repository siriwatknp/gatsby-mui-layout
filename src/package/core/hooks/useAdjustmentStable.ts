import useScreen from "./useScreen"
import { MapBreakpoint } from "../../types"

export default <T>(
  map: MapBreakpoint<T>,
  predicate: (c: T) => boolean
) => {
  const screen = useScreen()
  let headerAdjustmentStable: boolean = false
  const config = map?.[screen]
  if (predicate(config)) {
    // @ts-ignore
    headerAdjustmentStable = config?.headerAdjustmentStable
  }
  return headerAdjustmentStable
}
