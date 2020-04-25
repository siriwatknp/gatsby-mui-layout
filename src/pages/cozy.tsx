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
import { cozy } from '../package/presets'

const IndexPage = () => {
  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <Root
        scheme={cozy}
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
