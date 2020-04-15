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
import { Root, Header, DrawerSidebar } from "../package/components"
import Layout, { useLayoutCtx } from "../package/core"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"

const TriggerBtn = ({ sidebarId }: { sidebarId: string }) => {
  const { setOpen, state } = useLayoutCtx()
  const open = state.sidebar.primarySidebar.open
  return (
    <button onClick={() => setOpen(sidebarId, !open)}>
      {open ? "Close" : "Open"}
    </button>
  )
}

const CollapsedBtn = ({ sidebarId }: { sidebarId: string }) => {
  const { setCollapsed, state } = useLayoutCtx()
  const { collapsed } = state.sidebar.primarySidebar
  return (
    <button onClick={() => setCollapsed(sidebarId, !collapsed)}>
      {collapsed ? "Expand" : "Shrink"}
    </button>
  )
}

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
        persistentBehavior: "flexible",
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
            <TriggerBtn sidebarId={"primarySidebar"} />
            Hello
          </Toolbar>
        </Header>
        <DrawerSidebar id="primarySidebar" hiddenBreakpoints={["xs"]}>
          <div>
            <NavContentMockUp />
            <CollapsedBtn sidebarId={"primarySidebar"} />
          </div>
        </DrawerSidebar>
      </Root>
    </StylesProvider>
  )
}

export default IndexPage
