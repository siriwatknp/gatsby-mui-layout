import createModel from "./PersistentSidebarEffect"
import { PersistentSidebarConfig, ISidebarEffect } from "../../types"

const getWidthStyle = (model: ISidebarEffect, ...args: any[]) =>
  model.getObjectWidth(...args).getStyle()
const getMarginStyle = (model: ISidebarEffect, ...args: any[]) =>
  model.getObjectMargin(...args).getStyle()

describe("[Simple] None Behavior", () => {
  const baseConfig = {
    id: "persistent-sidebar",
    anchor: "left" as const,
    collapsible: true,
    collapsedWidth: 80,
    width: 256,
    persistentBehavior: "none" as const,
  }

  it("affect nothing", () => {
    const model = createModel(baseConfig, { open: true })
    expect(getMarginStyle(model)).toEqual({
      marginLeft: 0,
    })
    expect(getWidthStyle(model)).toEqual({
      width: "100%",
    })
  })
})

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
    expect(getMarginStyle(model)).toEqual({
      marginLeft: 0,
    })

    model = createModel(baseConfig, { open: true })
    // default to "fit"
    expect(getMarginStyle(model)).toEqual({
      marginLeft: 256,
    })

    model = createModel(baseConfig, { open: true })
    expect(getMarginStyle(model)).toEqual({
      marginLeft: 256,
    })

    model = createModel(baseConfig, { open: true })
    expect(getMarginStyle(model)).toEqual({
      marginLeft: 256,
    })
  })

  it("[anchor: left] affect margin left when collapsed", () => {
    let model = createModel(baseConfig, { open: true, collapsed: true })
    expect(getMarginStyle(model)).toEqual({
      marginLeft: 80,
    })
  })

  it("[anchor: right] affect margin right", () => {
    baseConfig.width = 300
    baseConfig.anchor = "right"
    let model = createModel(baseConfig, { open: false })
    expect(getMarginStyle(model)).toEqual({
      marginRight: 0,
    })

    model = createModel(baseConfig, { open: true })
    expect(getMarginStyle(model)).toEqual({
      marginRight: 300,
    })
  })

  it("affect other object's width", () => {
    baseConfig.width = "30%"
    baseConfig.collapsedWidth = 80
    let model = createModel(baseConfig, { open: false, collapsed: false })
    expect(getWidthStyle(model)).toEqual({ width: "100%" })

    model = createModel(baseConfig, { open: true, collapsed: false })
    expect(getWidthStyle(model)).toEqual({ width: "calc(100% - (30%))" })
    expect(getWidthStyle(model)).toEqual({
      width: "calc(100% - (30%))",
    })

    model = createModel(baseConfig, { open: true, collapsed: true })
    expect(getWidthStyle(model)).toEqual({
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
    expect(getMarginStyle(model)).toEqual({
      marginLeft: 256,
    })

    baseConfig.anchor = "right"
    model = createModel(baseConfig, { open: true })
    expect(getMarginStyle(model)).toEqual({
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
    expect(getMarginStyle(model, "object1")).toEqual({
      marginLeft: 256,
    })
    expect(getWidthStyle(model, "object1")).toEqual({
      width: "calc(100% - 256px)",
    })

    // object 2
    expect(getMarginStyle(model, "object2")).toEqual({
      marginLeft: 256,
    })
    expect(getWidthStyle(model, "object2")).toEqual({
      width: "100%",
    })
  })

  it("[anchor: right] return correct width and margin for each object", () => {
    baseConfig.anchor = "right"
    let model = createModel(baseConfig, { open: true, collapsed: true })
    // object 1
    expect(getMarginStyle(model, "object1")).toEqual({
      marginRight: 80,
    })
    expect(getWidthStyle(model, "object1")).toEqual({
      width: "calc(100% - 80px)",
    })

    // object 2
    expect(getMarginStyle(model, "object2")).toEqual({
      marginLeft: -80,
    })
    expect(getWidthStyle(model, "object2")).toEqual({
      width: "100%",
    })
  })
})
