import React from "react"
import { Root, Header } from "../package/components"
import Layout from "../package/core/Builder"

const IndexPage = () => {
  const scheme = Layout()
  scheme.configureHeader(h =>
    h.createConfig("xs", {
      id: "header",
      position: "fixed",
      clipped: true,
    })
  )
  scheme.configureSidebar(s =>
    s.createPersistentSidebarConfig("sm", {
      id: "primary-sidebar",
      anchor: "left",
      width: 256,
      persistentBehavior: "fit",
      collapsible: true,
      collapsedWidth: 80,
    })
  )
  return (
    <Root scheme={scheme}>
      <Header>Hello</Header>
    </Root>
  )
}

export default IndexPage
