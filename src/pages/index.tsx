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
        position: "fixed",
        clipped: false,
      })
      .registerConfig("md", {
        position: "sticky",
        clipped: false,
      })
      .registerConfig("lg", {
        position: "sticky",
        clipped: true,
      })
  })
  scheme.configureSidebar(builder => {
    builder
      .create("primarySidebar")
      .registerTemporaryConfig("xs", {
        anchor: "left",
        width: "auto",
      })
      .registerPersistentConfig("sm", {
        anchor: "left",
        width: 256,
        persistentBehavior: "fit",
        collapsible: true,
        collapsedWidth: 80,
      })
      .registerPersistentConfig("md", {
        anchor: "left",
        width: "30%",
        persistentBehavior: "fit",
        collapsible: true,
        collapsedWidth: 80,
      })

    builder
      .create("secondarySidebar")
      .registerPersistentConfig("md", {
        anchor: "right",
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
  scheme.configureInset(builder => {
    builder
      .create("insetSidebar")
      .registerAbsoluteConfig("sm", {
        width: "33%",
      })
      .registerStickyConfig("md", {
        top: "4rem",
        width: 256,
      })
      .registerFixedConfig("lg", {
        anchor: "right",
        width: "10rem",
      })

    builder.create("secondInsetSidebar").registerFixedConfig("lg", {
      anchor: "left",
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
        <DrawerSidebar id="primarySidebar">
          <div>
            <NavContentMockUp />
          </div>
          <CollapseBtn />
        </DrawerSidebar>
        <DrawerSidebar id="secondarySidebar">
          <div>
            <NavContentMockUp />
          </div>
          <CollapseBtn />
        </DrawerSidebar>
        <Content>
          <InsetContainer>
            <InsetSidebar id="secondInsetSidebar">
              <Box height={200} width={80} bgcolor={"primary.main"} />
            </InsetSidebar>
            <ContentMockUp />
            <InsetSidebar id="insetSidebar">
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
