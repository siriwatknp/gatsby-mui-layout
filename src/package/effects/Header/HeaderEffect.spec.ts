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
    expect(model.getEdgeSidebarZIndex("sidebar-3")).toEqual({
      zIndex: 1220,
    })
  })

  it("return initial height if clipped", () => {
    let model = createModel({
      position: "sticky",
      initialHeight: 64,
      clipped: { "sidebar-1": false, "sidebar-2": true },
    })
    expect(
      model.getInitialHeight({ clippable: true, objectId: "sidebar-2" })
    ).toEqual(64)
    expect(
      model.getInitialHeight({ clippable: true, objectId: "sidebar-1" })
    ).toEqual(0)
    expect(model.getInitialHeight()).toEqual(0)
  })

  it("return initial height if absolute|fixed otherwise 0", () => {
    let model = createModel({
      position: "fixed",
      initialHeight: 64,
    })
    expect(model.getInitialHeight()).toEqual(64)

    model = createModel({
      position: "relative",
      initialHeight: 64,
    })
    expect(model.getInitialHeight()).toEqual(0)
  })

  it("return correct height offset for clipped sidebar", () => {
    let model = createModel({
      position: "relative",
      initialHeight: 64,
      clipped: true,
    })
    expect(model.getOffsetHeight({ clippable: true, scrollY: 0 })).toEqual(0)
    expect(model.getOffsetHeight({ clippable: true, scrollY: 32 })).toEqual(32)
    expect(model.getOffsetHeight({ clippable: true, scrollY: 90 })).toEqual(90)
  })

  it("return correct height offset for unclipped but relative", () => {
    let model = createModel({
      position: "relative",
      initialHeight: 64,
      clipped: true,
    })
    expect(model.getOffsetHeight({ clippable: false, scrollY: 0 })).toEqual(0)
    expect(model.getOffsetHeight({ clippable: false, scrollY: 32 })).toEqual(0)
    expect(model.getOffsetHeight({ clippable: false, scrollY: 90 })).toEqual(0)
  })
})
