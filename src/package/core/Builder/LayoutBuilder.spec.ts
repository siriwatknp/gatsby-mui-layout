import LayoutBuilder from "./LayoutBuilder"

describe("Layout Builder", () => {
  it("able to configure header", () => {
    const layout = LayoutBuilder()
    layout.configureHeader(h => {
      h.createConfig("xs", {
        id: "header",
        position: "sticky",
        clipped: true,
      })
    })
  })
})
