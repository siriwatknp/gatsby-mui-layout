import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container, { ContainerProps } from "@material-ui/core/Container"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
  },
})

const InsetContainer: React.FC<ContainerProps> = ({ children, ...props }) => {
  const classes = useStyles(props)
  return (
    <Container {...props} classes={classes}>
      {children}
    </Container>
  )
}

export default InsetContainer
