import InsetSidebarCompiler from "./InsetSidebarCompiler"
import InsetSidebarBuilder from "../builders/InsetSidebar"

describe("InsetSidebarCompiler", () => {
  it("return correct style", () => {
    const builder = InsetSidebarBuilder()

    builder
      .create("insetSidebar")
      .registerFixedConfig("sm", {
        anchor: "right",
        width: "40rem",
      })
      .registerAbsoluteConfig("md", {
        width: "33%",
      })
      .registerStickyConfig("lg", {
        top: "4rem",
        width: 256,
      })

    const compiler = InsetSidebarCompiler(builder.getData())

    expect(compiler.getResultStyle("insetSidebar")).toStrictEqual({
      root: {
        sm: {
          width: "40rem",
        },
        md: { width: "33%" },
        lg: { width: 256 },
      },
      body: {
        sm: {
          position: "fixed",
          top: 0,
          height: "100%",
          marginRight: -999,
          paddingRight: 999,
          width: "auto",
        },
        md: { position: "absolute", top: 0, width: "100%" },
        lg: { position: "sticky", top: "4rem" },
      },
    })
  })
})
