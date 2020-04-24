import React from "react"
import styled from "styled-components"
import { makeStyles } from "@material-ui/core/styles"
import HeaderAdjustment from "../HeaderAdjustment"
import InsetHeaderOffset from "../InsetHeaderOffset"
import { useInsetSidebar } from "../../core"
import useAdjustmentStable from "../../core/hooks/useAdjustmentStable"
import { MediaQueries } from "../../utils/createBreakpointStyles"
import { isFixedInsetSidebarConfig } from "../../utils/sidebarChecker"

const useStyles = makeStyles(({ palette }) => ({
  root: {
    position: "relative",
    flexShrink: 0,
  },
  body: {
    backgroundColor: palette?.grey?.[100],
  },
}))

const Proxy: React.FC<{
  className: string
  styles: MediaQueries
}> = ({ styles, ...props }) => <div {...props} />
const Div = styled(Proxy)<{ styles: MediaQueries }>(({ styles }) => styles)

const InsetSidebar = ({
  sidebarId,
  children,
  ...props
}: React.PropsWithChildren<{
  sidebarId: string
  classes?: { root: object; body: object }
}>) => {
  const classes = useStyles(props)
  const { rootStyles, bodyStyles, variant, insetSidebar } = useInsetSidebar(
    sidebarId
  )
  const stable = useAdjustmentStable(
    insetSidebar.configMapById?.[sidebarId],
    isFixedInsetSidebarConfig
  )
  return (
    <Div className={`InsetSidebar-root ${classes.root}`} styles={rootStyles}>
      <Div className={`InsetSidebar-body ${classes.body}`} styles={bodyStyles}>
        <InsetHeaderOffset sidebarId={sidebarId} />
        {children}
      </Div>
    </Div>
  )
}

export default InsetSidebar
