import createModel from "./BaseSidebarModel"
import { EdgeSidebarConfig } from "../../types"

describe("BaseSidebarModel", () => {
  let baseConfig: EdgeSidebarConfig
  beforeEach(() => {
    baseConfig = {
      id: "s1",
      anchor: "left",
      collapsedWidth: 80,
      collapsible: true,
      width: "30%",
    }
  })
  it("return the width before collapsed", () => {
    let model = createModel(baseConfig)
    expect(model).toEqual({
      currentWidth: "30%",
    })
  })

  it("return the collapsed width", () => {
    let model = createModel(baseConfig, {
      sidebar: { s1: { collapsed: true } },
    })
    expect(model).toEqual({
      currentWidth: 80,
    })
  })
})
