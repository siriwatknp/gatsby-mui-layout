import Builder from "./Builder"

describe("Layout Builder", () => {
  it("able to configure header", () => {
    const layout = Builder()
    layout.configureHeader(h => {
      h.createConfig("xs", {
        id: "header",
        position: "sticky",
        clipped: true,
      })
    })
  })
})
