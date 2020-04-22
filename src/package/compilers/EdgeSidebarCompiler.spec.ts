import EdgeSidebarCompiler from "./EdgeSidebarCompiler"
import EdgeSidebarBuilder from "../builders/EdgeSidebar"
import HeaderBuilder from "../builders/Header"
import SidebarBuilder from "../builders/EdgeSidebar/EdgeSidebarBuilder"

describe("EdgeSidebarCompiler", () => {
  it("get correct result style", () => {
    const sidebar = EdgeSidebarBuilder()
    sidebar
      .create("primarySidebar")
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
    const compiler = EdgeSidebarCompiler(
      {
        sidebar: { primarySidebar: { collapsed: false, open: true } },
      },
      sidebar.getData(),
      header.getConfig()
    )

    expect(compiler.getResultStyle()).toStrictEqual({
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

  it("return empty if no breakpoint config found", () => {
    const sidebar = SidebarBuilder()
    sidebar.create("primarySidebar").registerPersistentConfig("md", {
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

    const compiler = EdgeSidebarCompiler(
      {
        sidebar: { primarySidebar: { open: true, collapsed: true } },
      },
      sidebar.getData(),
      header.getConfig()
    )

    expect(compiler.getResultStyle()).toStrictEqual({
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
})
