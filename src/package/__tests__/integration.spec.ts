import Layout from "../core/Builder"

describe("Header + PrimarySidebar + SecondarySidebar + Content", () => {
  it("can create config and get the correct config", () => {
    const scheme = Layout()
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

      builder
        .createEdgeSidebar("secondarySidebar")
        .registerPersistentConfig("md", {
          anchor: "right",
          width: 240,
          persistentBehavior: {
            _other: "none",
            footer: "fit",
          },
          collapsible: true,
          collapsedWidth: 64,
        })
    })

    scheme.configureHeader(builder => {
      builder
        .create("header")
        .registerConfig("xs", {
          position: "fixed",
          clipped: false,
        })
        .registerConfig("md", {
          position: "relative",
          clipped: true,
        })
    })

    scheme.configureContent(builder => {
      builder.create('content')
    })

    scheme.configureFooter(builder => {
      builder.create('footer')
    })

    const state = {
      sidebar: {
        primarySidebar: { open: true, collapsed: false },
        secondarySidebar: { open: true, collapsed: false },
      },
    }

    const styles = scheme.getComponentStyle(state)

    expect(styles.sidebar).toStrictEqual({
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
      secondarySidebar: {
        permanent: {},
        temporary: {},
        persistent: {
          md: {
            width: 240,
          },
        },
      },
    })

    expect(styles.header).toStrictEqual({
      xs: {
        position: "fixed",
      },
      sm: {
        marginLeft: 256,
        width: "calc(100% - 256px)",
        position: "fixed",
      },
      md: {
        marginLeft: "calc(0 + 0)",
        marginRight: "calc(0 + 0)",
        width: "100%",
        zIndex: 1210,
        position: "relative",
      },
      lg: {
        marginLeft: 'calc(0 + 0)',
        marginRight: 'calc(0 + 0)',
        width: "100%",
        zIndex: 1210,
        position: "relative",
      },
    })

    expect(styles.content).toStrictEqual({
      xs: {},
      sm: {
        marginLeft: 256,
        width: 'calc(100% - 256px)',
      },
      md: {
        marginLeft: 'calc(30%)',
        marginRight: 0,
        width: '100%',
      },
      lg: {
        marginLeft: 'calc(50%)',
        marginRight: 0,
        width: 'calc(100% - (50%))'
      }
    })

    expect(styles.footer).toStrictEqual({
      xs: {},
      sm: {
        marginLeft: 256,
        width: 'calc(100% - 256px)',
      },
      md: {
        marginLeft: 'calc(30%)',
        marginRight: 240,
        width: 'calc(100% - 240px)',
      },
      lg: {
        marginLeft: 'calc(50%)',
        marginRight: 240,
        width: 'calc(100% - (50% + 240px))'
      }
    })
  })
})
