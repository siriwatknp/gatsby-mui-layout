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
  FullScreen,
  InsetSidebar,
  InsetContainer,
  InsetFooter,
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
        initialHeight: 56,
        position: "fixed",
      })
      .registerConfig("md", {
        initialHeight: 64,
        position: "relative",
      })
  })
  scheme.configureInsetSidebar(builder => {
    builder
      .create("primarySidebar", { anchor: "right" })
      .registerFixedConfig("md", {
        width: 256,
        headerMagnetEnabled: true,
      })
      .registerAbsoluteConfig("lg", {
        width: "30%",
      })
  })

  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <Root
        scheme={scheme}
        // initialState={{ sidebar: { primarySidebar: { open: true } } }}
      >
        <FullScreen>
          <Header>
            <Toolbar>
              <SidebarTrigger sidebarId="primarySidebar" />
              <HeaderMockUp />
            </Toolbar>
          </Header>
          <Content>
            <InsetContainer
              maxWidth={false}
              disableGutters
              rightSidebar={
                <InsetSidebar sidebarId="primarySidebar">
                  <NavHeaderMockUp />
                  <div style={{ flex: 1 }}>
                    <NavContentMockUp />
                  </div>
                </InsetSidebar>
              }
            >
              <ContentMockUp />
            </InsetContainer>
          </Content>
          <InsetFooter>
            <FooterMockUp />
          </InsetFooter>
        </FullScreen>
      </Root>
    </StylesProvider>
  )
}

export default IndexPage
