import createModel from "./BaseSidebarModel"
import { EdgeSidebarConfig } from "../../types"

describe("BaseSidebarModel", () => {
  let baseConfig: EdgeSidebarConfig
  beforeEach(() => {
    baseConfig = {
      collapsedWidth: 80,
      collapsible: true,
      width: "30%",
    }
  })
  it("return the width before collapsed", () => {
    let model = createModel(baseConfig, { collapsed: false })
    expect(model).toEqual({
      currentWidth: "30%",
    })
  })

  it("return the collapsed width", () => {
    let model = createModel(baseConfig, { collapsed: true })
    expect(model).toEqual({
      currentWidth: 80,
    })
  })
})
