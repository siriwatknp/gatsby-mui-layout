import InsetBuilder from "./InsetBuilder"

describe("InsetBuilder", () => {
  it("return correct style", () => {
    const builder = InsetBuilder()

    builder
      .createSidebar("insetSidebar")
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

    expect(builder.getResultStyle()).toStrictEqual({
      insetSidebar: {
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
      },
    })
  })
})
