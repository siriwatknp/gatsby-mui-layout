import React from "react"
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
        position: "relative",
        clipped: false,
      })
  })
  scheme.configureSidebar(builder => {
    builder
      .createEdgeSidebar("primarySidebar")
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
      .registerPermanentConfig("lg", {
        anchor: "left",
        width: "50%",
        collapsible: true,
        collapsedWidth: "12%",
      })
  })
  return (
    <StylesProvider injectFirst>
      <Root
        scheme={scheme}
        initialState={{ sidebar: { primarySidebar: { open: true } } }}
      >
        <Header>
          <Toolbar>
            <SidebarTrigger sidebarId="primarySidebar" />
            Hello
          </Toolbar>
        </Header>
        <SwipeableSidebar id="primarySidebar">
          <div>
            <NavContentMockUp />
          </div>
          <CollapseBtn />
        </SwipeableSidebar>
      </Root>
    </StylesProvider>
  )
}

export default IndexPage
