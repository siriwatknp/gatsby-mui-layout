import React from "react"
import useTheme from "@material-ui/core/styles/useTheme"
import { useLayoutCtx } from "../../core"
import StyledProxy from "../StyledProxy"
import InsetAvoidingViewModel from "../../models/InsetAvoidingView"

const InsetAvoidingView = (props: React.PropsWithChildren<{}>) => {
  const { config } = useLayoutCtx()
  const { breakpoints } = useTheme()
  const { styles } = InsetAvoidingViewModel(config, breakpoints)
  return <StyledProxy {...props} styles={styles} />
}

export default InsetAvoidingView
