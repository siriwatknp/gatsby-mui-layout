import React from "react"
import styled from "styled-components"
import { makeStyles } from "@material-ui/core/styles"
import { useInsetSidebar } from "../../core"
import { MediaQueries } from "../../utils/createBreakpointStyles"

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
  id,
  children,
  ...props
}: React.PropsWithChildren<{
  id?: string
  classes?: { root: object; body: object }
}>) => {
  const classes = useStyles(props)
  const { rootStyles, bodyStyles } = useInsetSidebar(id)
  return (
    <Div className={`InsetSidebar-root ${classes.root}`} styles={rootStyles}>
      <Div className={`InsetSidebar-body ${classes.body}`} styles={bodyStyles}>
        {children}
      </Div>
    </Div>
  )
}

export default InsetSidebar
