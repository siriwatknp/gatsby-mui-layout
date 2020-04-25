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
  InsetContainer,
  InsetSidebar,
  InsetAvoidingView,
  InsetFooter,
  DrawerSidebar,
  SwipeableSidebar,
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
        initialHeight: 56
      })
      .registerConfig("md", {
        position: "relative",
        clipped: true,
        initialHeight: 64,
      })
      .registerConfig("lg", {
        position: "sticky",
        initialHeight: 64,
        clipped: true,
      })
  })
  scheme.configureEdgeSidebar(builder => {
    builder
      .create("primarySidebar", { anchor: "left" })
      .registerTemporaryConfig("xs", {
        width: "auto",
      })
      .registerPersistentConfig("sm", {
        width: 256,
        persistentBehavior: "fit",
        collapsible: true,
        collapsedWidth: 80,
        headerMagnetEnabled: true
      })
      .registerPersistentConfig("md", {
        width: "30%",
        persistentBehavior: "fit",
        collapsible: true,
        collapsedWidth: 80,
        headerMagnetEnabled: true
      })


    builder
      .create("secondarySidebar", { anchor: "right" })
      .registerPersistentConfig("md", {
        width: 240,
        persistentBehavior: {
          _other: "none",
          appHeader: "fit",
          appFooter: "fit",
        },
        collapsible: true,
        collapsedWidth: 64,
      })
  })
  scheme.configureInsetSidebar(builder => {
    builder
      .create("insetSidebar", { anchor: "right" })
      .registerAbsoluteConfig("sm", {
        width: "33%",
      })
      .registerStickyConfig("md", {
        top: "4rem",
        width: 256,
      })
      .registerFixedConfig("lg", {
        width: "10rem",
      })

    builder
      .create("secondInsetSidebar", { anchor: "left" })
      .registerFixedConfig("lg", {
        width: "5rem",
      })
  })
  scheme.configureFooter(builder => {
    builder.create("appFooter")
  })
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
            <Box flex={1}>Hello</Box>
            <SidebarTrigger sidebarId="secondarySidebar" />
          </Toolbar>
        </Header>
        <DrawerSidebar sidebarId="primarySidebar">
          <div>
            <NavContentMockUp />
          </div>
          <CollapseBtn />
        </DrawerSidebar>
        <DrawerSidebar sidebarId="secondarySidebar">
          <div>
            <NavContentMockUp />
          </div>
          <CollapseBtn />
        </DrawerSidebar>
        <Content>
          <InsetContainer>
            <InsetSidebar sidebarId="secondInsetSidebar">
              <Box height={200} width={80} bgcolor={"primary.main"} />
            </InsetSidebar>
            <ContentMockUp />
            <InsetSidebar sidebarId="insetSidebar">
              <NavContentMockUp />
            </InsetSidebar>
          </InsetContainer>
        </Content>
        <InsetFooter>
          <FooterMockUp />
        </InsetFooter>
      </Root>
    </StylesProvider>
  )
}

export default IndexPage
