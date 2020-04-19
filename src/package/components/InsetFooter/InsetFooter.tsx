import React from "react"
import Container, { ContainerProps } from "@material-ui/core/Container"
import Footer from "../Footer"
import InsetAvoidingView from "../InsetAvoidingView"

const InsetFooter: React.FC<{ ContainerProps?: ContainerProps }> = ({
  children,
  ContainerProps,
}) => (
  <Footer>
    <Container {...ContainerProps}>
      <InsetAvoidingView>{children}</InsetAvoidingView>
    </Container>
  </Footer>
)

export default InsetFooter
