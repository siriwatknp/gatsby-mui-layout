import React from "react"
import { StylesProvider } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import { Root, Header } from "../package/components"
import Layout, { useLayoutCtx } from "../package/core"

const CollapseBtn = ({ sidebarId }: { sidebarId: string }) => {
  const { setOpen, state } = useLayoutCtx()
  const open = state.sidebar.primarySidebar.open
  return (
    <button onClick={() => setOpen(sidebarId, !open)}>
      {open ? "Close" : "Open"}
    </button>
  )
}

const IndexPage = () => {
  const scheme = Layout()
  scheme.configureHeader(builder => {
    builder.create("appHeader").registerConfig("xs", {
      position: "fixed",
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
        persistentBehavior: "fit",
        collapsible: true,
        collapsedWidth: 80,
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
            <CollapseBtn sidebarId={"primarySidebar"} />
            Hello
          </Toolbar>
        </Header>
        <Sidebar.Drawer id="primarySidebar" />
        <Sidebar.SwipableDrawer id="secondarySidebar" />
      </Root>
    </StylesProvider>
  )
}

export default IndexPage
