import SidebarBuilder, { isUniqueSidebars } from "./SidebarBuilder"
import HeaderBuilder from "../Header/HeaderBuilder"

it("can check unique sidebars", () => {
  expect(
    isUniqueSidebars([
      { id: "sidebar-1" },
      { id: "sidebar-1" },
      { id: "sidebar-2" },
    ])
  ).toBeFalsy()
})

it("can create config and get the correct config", () => {
  const sidebar = SidebarBuilder()
  sidebar
    .createEdgeSidebar("primarySidebar")
    .registerPersistentConfig("xs", {
      anchor: "left",
      width: 256,
      collapsible: true,
      collapsedWidth: 80,
      persistentBehavior: "flexible",
    })
    .registerPersistentConfig("md", {
      anchor: "left",
      width: "30%",
      collapsible: false,
      persistentBehavior: "fit",
    })
    .registerPermanentConfig("lg", {
      anchor: "left",
      width: "50%",
      collapsible: false,
    })

  const header = HeaderBuilder()
  header.create("header").registerConfig("xs", {
    clipped: false,
    position: "sticky",
  })

  expect(
    sidebar.getResultStyle(
      {
        sidebar: {
          primarySidebar: { open: true, collapsed: false },
        },
      },
      header
    )
  ).toStrictEqual({
    primarySidebar: {
      temporary: {},
      permanent: {
        lg: { width: "50%" },
      },
      persistent: {
        xs: { width: 256 },
        md: { width: "30%" },
      },
    },
  })
})

it("return empty if no config found", () => {
  const sidebar = SidebarBuilder()
  sidebar.createEdgeSidebar("primarySidebar").registerPersistentConfig("md", {
    anchor: "left",
    width: "30%",
    collapsible: true,
    collapsedWidth: "12%",
    persistentBehavior: "fit",
  })

  const header = HeaderBuilder()
  header.create("header").registerConfig("xs", {
    clipped: false,
    position: "sticky",
  })

  expect(
    sidebar.getResultStyle(
      {
        sidebar: {
          primarySidebar: { open: true, collapsed: true },
        },
      },
      header
    )
  ).toStrictEqual({
    primarySidebar: {
      temporary: {},
      permanent: {},
      persistent: {
        md: {
          width: "12%",
        },
      },
    },
  })
})
