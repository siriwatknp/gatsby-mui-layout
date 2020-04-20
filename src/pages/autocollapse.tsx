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
  Content,
  Footer,
  DrawerSidebar,
  SidebarTrigger,
  CollapseBtn,
} from "../package/components"
import Layout from "../package/core"
import useScreen from "../package/core/hooks/useScreen"

const IndexPage = () => {
  const screen = useScreen()
  console.log('screen', screen);
  const scheme = Layout()
  scheme.configureHeader(builder => {
    builder.create("appHeader").registerConfig("xs", {
      position: "fixed",
      clipped: false,
    })
  })
  scheme.configureSidebar(builder => {
    builder.createEdgeSidebar("primarySidebar").registerPermanentConfig("md", {
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
