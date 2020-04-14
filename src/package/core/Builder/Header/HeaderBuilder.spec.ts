import HeaderBuilder from "./HeaderBuilder"
import SidebarBuilder from "../Sidebar/SidebarBuilder"

it("can create config and return correct config", () => {
  const header = HeaderBuilder()
  expect(header.getConfig()).toEqual({})

  const xsConfig = {
    id: "header",
    clipped: true,
    position: "sticky" as const,
  }
  const mdConfig = {
    id: "header",
    clipped: false,
    position: "fixed" as const,
  }
  header
    .create("header")
    .registerConfig("xs", xsConfig)
    .registerConfig("md", mdConfig)
  expect(header.getConfig()).toEqual({
    xs: xsConfig,
    md: mdConfig,
  })
  expect(header.getBreakpointConfig("md")).toEqual(mdConfig)
  // will return lower breakpoint if not found
  expect(header.getBreakpointConfig("lg")).toEqual(mdConfig)
  expect(
    header.getBreakpointEffect("md").getEdgeSidebarZIndex()
  ).toBeUndefined()
})

it("return correct result style by mapping all possible breakpoints with related effect", () => {
  const header = HeaderBuilder()

  header
    .create("header")
    .registerConfig("xs", {
      clipped: true,
      position: "sticky",
    })
    .registerConfig("md", {
      clipped: false,
      position: "sticky",
    })

  const sidebar = SidebarBuilder()
  sidebar
    .create("sidebar-1")
    .registerPersistentSidebarConfig("xs", {
      anchor: "left",
      width: 256,
      collapsible: true,
      collapsedWidth: 80,
      persistentBehavior: "fit",
    })
    .registerPersistentSidebarConfig("xl", {
      anchor: "left",
      width: "30%",
      collapsible: false,
      persistentBehavior: "fit",
    })

  expect(
    header.getResultStyle({ sidebar: { "sidebar-1": { open: true } } }, sidebar)
  ).toStrictEqual({
    xs: {
      zIndex: 1210,
    },
    md: {
      width: "calc(100% - 256px)",
      marginLeft: 256,
    },
    xl: {
      marginLeft: "calc(30%)",
      width: "calc(100% - (30%))",
    },
  })
})
