import { BreakpointConfig, LayoutConfig } from "../../types"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"

export interface BreakpointsBuilder {
  getLayoutConfig: () => LayoutConfig
  getBreakpointConfig: (breakpoint: Breakpoint) => BreakpointConfig
  clone: (breakpoint: Breakpoint, callback: (config: BreakpointConfig) => void) => void
}

export default (mobileConfig: BreakpointConfig) => {

}
