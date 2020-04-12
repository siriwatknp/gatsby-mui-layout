import HeaderBuilder from "./HeaderBuilder"
import SidebarBuilder from "../Sidebar/SidebarBuilder"

it("can create config and return correct config", () => {
  const initialConfig = {
    id: "header",
    clipped: true,
    position: "sticky" as const,
  }
  const header = HeaderBuilder(initialConfig)
  expect(header.getConfig()).toEqual({
    xs: initialConfig,
  })

  const mdConfig = {
    id: "header",
    clipped: false,
    position: "fixed" as const,
  }
  header.createConfig("md", mdConfig)
  expect(header.getConfig()).toEqual({
    xs: initialConfig,
    md: mdConfig,
  })
  expect(header.getBreakpointConfig("md")).toEqual(mdConfig)
  // will return lower breakpoint if not found
  expect(header.getBreakpointConfig("lg")).toEqual(mdConfig)
  expect(
    header.getBreakpointEffect("md").getEdgeSidebarZIndex()
  ).toBeUndefined()
})

it("return correct result style", () => {
  const header = HeaderBuilder({
    id: "header",
    clipped: true,
    position: "sticky",
  })
  header.createConfig("md", {
    id: "header",
    clipped: false,
    position: "sticky",
  })

  const sidebar = SidebarBuilder()
  sidebar.createPersistentSidebarConfig("xs", {
    id: "sidebar-1",
    anchor: "left",
    width: 256,
    collapsible: true,
    collapsedWidth: 80,
    persistentBehavior: "fit",
  })

  expect(
    header.getResultStyle({ open: true, collapsed: false }, sidebar)
  ).toStrictEqual({
    xs: {
      zIndex: 1210,
    },
    md: {
      width: "calc(100% - 256px)",
      marginLeft: 256,
    },
  })
})
