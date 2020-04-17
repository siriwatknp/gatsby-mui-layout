import SidebarBuilder from "../core/Builder/Sidebar/SidebarBuilder"
import HeaderBuilder from "../core/Builder/Header/HeaderBuilder"

describe("Header + Sidebar", () => {
  it("can create config and get the correct config", () => {
    const sidebar = SidebarBuilder()
    sidebar
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

    const header = HeaderBuilder()
    header
      .create("header")
      .registerConfig("xs", {
        position: "fixed",
        clipped: false,
      })
      .registerConfig("md", {
        position: "relative",
        clipped: true,
      })

    const state = {
      sidebar: {
        primarySidebar: { open: true, collapsed: false },
      },
    }

    expect(sidebar.getResultStyle(state, header)).toStrictEqual({
      primarySidebar: {
        temporary: {
          xs: {
            width: "auto",
          },
        },
        permanent: {
          lg: { width: "50%" },
        },
        persistent: {
          sm: { width: 256 },
          md: { width: "30%" },
        },
      },
    })

    expect(header.getResultStyle(state, sidebar)).toStrictEqual({
      xs: {
        position: "fixed",
      },
      sm: {
        marginLeft: 256,
        width: "calc(100% - 256px)",
        position: "fixed",
      },
      md: {
        marginLeft: 0,
        marginRight: 0,
        width: "100%",
        zIndex: 1210,
        position: "relative",
      },
      lg: {
        marginLeft: 0,
        marginRight: 0,
        width: "100%",
        zIndex: 1210,
        position: "relative",
      },
    })
  })
})
