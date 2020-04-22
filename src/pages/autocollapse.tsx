import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { StylesProvider } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Box from "@material-ui/core/Box"
import {
  HeaderMockUp,
  NavHeaderMockUp,
  NavContentMockUp,
  ContentMockUp,
  FooterMockUp,
  // @ts-ignore
} from "@mui-treasury/mockup/layout"
import {
  Root,
  Header,
  HeaderAdjustment,
  Content,
  Footer,
  DrawerSidebar,
  SidebarTrigger,
  CollapseBtn,
} from "../package/components"
import Layout from "../package/core"

const IndexPage = () => {
  const scheme = Layout()
  scheme.configureHeader(builder => {
    builder
      .create("appHeader")
      .registerConfig("xs", {
        position: "fixed",
        clipped: true,
        initialHeight: 64,
      })
      .registerConfig("lg", {
        position: "relative",
        clipped: false,
        initialHeight: 72,
      })
  })
  scheme.configureSidebar(builder => {
    builder.create("primarySidebar").registerPermanentConfig("md", {
      anchor: "left",
      width: 256,
      collapsible: true,
      collapsedWidth: 80,
    })
  })
  scheme.enableAutoCollapse("primarySidebar")

  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <Root
        scheme={scheme}
        // initialState={{ sidebar: { primarySidebar: { open: true } } }}
      >
        <Header>
          <Toolbar>
            <SidebarTrigger sidebarId="primarySidebar" />
            <HeaderMockUp />
          </Toolbar>
        </Header>
        <DrawerSidebar id="primarySidebar">
          <HeaderAdjustment objectId="primarySidebar" clippable />
          <NavHeaderMockUp />
          <div style={{ flex: 1 }}>
            <NavContentMockUp />
          </div>
          <CollapseBtn />
        </DrawerSidebar>
        <Content>
          <HeaderAdjustment />
          <ContentMockUp />
        </Content>
        <Footer>
          <FooterMockUp />
        </Footer>
      </Root>
    </StylesProvider>
  )
}

export default IndexPage
