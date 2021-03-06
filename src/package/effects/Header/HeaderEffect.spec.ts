import createModel, { isSomeClipped } from "./HeaderEffect"

describe("HeaderEffect", function() {
  it("isSomeClipped return correct value", () => {
    expect(isSomeClipped({ clipped: false })).toBeFalsy()
    expect(
      isSomeClipped({ clipped: { "sidebar-1": false, "sidebar-2": false } })
    ).toBeFalsy()
    expect(
      isSomeClipped({ clipped: { "sidebar-1": false, "sidebar-2": true } })
    ).toBeTruthy()
  })

  it("return undefined if no 'clipped' config in header", () => {
    let model = createModel({
      id: "appHeader",
      position: "relative",
    })
    expect(model.getHeaderZIndex()).toBeUndefined()
    expect(model.getEdgeSidebarZIndex("some-sidebar")).toBeUndefined()
  })

  it("return correct header zIndex (single sidebar)", () => {
    let model = createModel({
      id: "appHeader",
      position: "sticky",
      clipped: { "sidebar-1": true },
    })
    expect(model.getHeaderZIndex()).toEqual({
      zIndex: 1210,
    })
    expect(model.getEdgeSidebarZIndex("sidebar-1")).toBeUndefined()
  })

  it("return correct header zIndex (multiple sidebars)", () => {
    let model = createModel({
      id: "appHeader",
      position: "sticky",
      clipped: { "sidebar-1": false, "sidebar-2": true },
    })
    expect(model.getHeaderZIndex()).toEqual({
      zIndex: 1210,
    })
    expect(model.getEdgeSidebarZIndex("sidebar-1")).toEqual({
      zIndex: 1220,
    })
    expect(model.getEdgeSidebarZIndex("sidebar-3")).toBeUndefined()
  })
})
