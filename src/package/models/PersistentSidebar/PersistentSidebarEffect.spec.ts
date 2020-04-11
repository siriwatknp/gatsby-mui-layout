import createModel from "./PersistentSidebarEffect"
import { PersistentSidebarConfig } from "../../types"

describe("[Simple] Fit Behavior", () => {
  let baseConfig: PersistentSidebarConfig
  beforeEach(() => {
    baseConfig = {
      id: "persistent-sidebar",
      anchor: "left",
      collapsible: true,
      collapsedWidth: 80,
      width: 256,
      persistentBehavior: "fit",
    }
  })

  it("[anchor: left] affect margin left", () => {
    let model = createModel(baseConfig, { open: false })
    expect(model.getObjectMargin()).toEqual({
      marginLeft: 0,
    })

    model = createModel(baseConfig, { open: true })
    // default to "fit"
    expect(model.getObjectMargin()).toEqual({
      marginLeft: 256,
    })

    model = createModel(baseConfig, { open: true })
    expect(model.getObjectMargin()).toEqual({
      marginLeft: 256,
    })

    model = createModel(baseConfig, { open: true })
    expect(model.getObjectMargin()).toEqual({
      marginLeft: 256,
    })
  })

  it("[anchor: left] affect margin left when collapsed", () => {
    let model = createModel(baseConfig, { open: true, collapsed: true })
    expect(model.getObjectMargin()).toEqual({
      marginLeft: 80,
    })
  })

  it("[anchor: right] affect margin right", () => {
    baseConfig.width = 300
    baseConfig.anchor = "right"
    let model = createModel(baseConfig, { open: false })
    expect(model.getObjectMargin()).toEqual({
      marginRight: 0,
    })

    model = createModel(baseConfig, { open: true })
    expect(model.getObjectMargin()).toEqual({
      marginRight: 300,
    })
  })

  it("affect other object's width", () => {
    baseConfig.width = "30%"
    baseConfig.collapsedWidth = 80
    let model = createModel(baseConfig, { open: false, collapsed: false })
    expect(model.getObjectWidth()).toEqual({ width: "100%" })

    model = createModel(baseConfig, { open: true, collapsed: false })
    expect(model.getObjectWidth()).toEqual({ width: "calc(100% - (30%))" })
    expect(model.getObjectWidth()).toEqual({
      width: "calc(100% - (30%))",
    })

    model = createModel(baseConfig, { open: true, collapsed: true })
    expect(model.getObjectWidth()).toEqual({
      width: "calc(100% - 80px)",
    })
  })
})

describe("[Simple] Flexible Behavior", () => {
  let baseConfig: PersistentSidebarConfig
  beforeEach(() => {
    baseConfig = {
      id: "persistent-sidebar",
      anchor: "left",
      collapsible: true,
      collapsedWidth: 80,
      width: 256,
      persistentBehavior: "flexible",
    }
  })
  it("[anchor: left | right] affect only margin left", () => {
    // ------------------------------------------------------------
    // special for persistent behavior : flexible
    // should only affect marginLeft as negative value, otherwise does not work
    // css constraint
    // todo support rtl direction
    let model = createModel(baseConfig, { open: true })
    expect(model.getObjectMargin()).toEqual({
      marginLeft: 256,
    })

    baseConfig.anchor = "right"
    model = createModel(baseConfig, { open: true })
    expect(model.getObjectMargin()).toEqual({
      marginLeft: -256,
    })
  })
})

describe("[ObjectReference] Mixed Behavior", () => {
  let baseConfig: PersistentSidebarConfig
  beforeEach(() => {
    baseConfig = {
      id: "persistent-sidebar",
      anchor: "left",
      collapsible: true,
      collapsedWidth: 80,
      width: 256,
      persistentBehavior: {
        object1: "fit",
        object2: "flexible",
      },
    }
  })
  it("[anchor: left] return correct width and margin for each object", () => {
    let model = createModel(baseConfig, { open: true })
    // object 1
    expect(model.getObjectMargin("object1")).toEqual({
      marginLeft: 256,
    })
    expect(model.getObjectWidth("object1")).toEqual({
      width: "calc(100% - 256px)",
    })

    // object 2
    expect(model.getObjectMargin("object2")).toEqual({
      marginLeft: 256,
    })
    expect(model.getObjectWidth("object2")).toEqual({
      width: "100%",
    })
  })

  it("[anchor: right] return correct width and margin for each object", () => {
    baseConfig.anchor = "right"
    let model = createModel(baseConfig, { open: true, collapsed: true })
    // object 1
    expect(model.getObjectMargin("object1")).toEqual({
      marginRight: 80,
    })
    expect(model.getObjectWidth("object1")).toEqual({
      width: "calc(100% - 80px)",
    })

    // object 2
    expect(model.getObjectMargin("object2")).toEqual({
      marginLeft: -80,
    })
    expect(model.getObjectWidth("object2")).toEqual({
      width: "100%",
    })
  })
})
