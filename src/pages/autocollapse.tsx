import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { StylesProvider } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
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
        position: "relative",
        clipped: true,
        initialHeight: 64,
      })
      .registerConfig("lg", {
        position: "fixed",
        clipped: false,
        initialHeight: 72,
      })
  })
  scheme.configureEdgeSidebar(builder => {
    builder
      .create("primarySidebar", { anchor: "left" })
      .registerPermanentConfig("md", {
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
        <DrawerSidebar sidebarId="primarySidebar">
          <NavHeaderMockUp />
          <div style={{ flex: 1 }}>
            <NavContentMockUp />
          </div>
          <CollapseBtn />
        </DrawerSidebar>
        <Content>
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
