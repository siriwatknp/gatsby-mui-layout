import createBreakpoints from "@material-ui/core/styles/createBreakpoints"
import pickNearestBreakpoint from "./pickNearestBreakpoint"
import createBreakpointStyles from "./createBreakpointStyles"
import combineBreakpoints from "./combineBreakpoints"
import createDisplayNone from "./createDisplayNone"
import createHiddenStyles, {
  sortBreakpoints,
  getVisibleRange,
  getBreakpointUpper,
  getBreakpointBelow,
  getVisibleRangeFromSiblings,
} from "./createHiddenStyles"
import getFlexBehaviorValue from "./getFlexBehaviorValue"

const breakpoints = createBreakpoints({})

describe("getFlexBehaviorValue", () => {
  it("return correct value", () => {
    expect(getFlexBehaviorValue("left", 300)).toEqual(300)
    expect(getFlexBehaviorValue("left", "30%")).toEqual("30%")
    expect(getFlexBehaviorValue("right", "40rem")).toEqual("-40rem")
    expect(getFlexBehaviorValue("right", 256)).toEqual(-256)
  })
})

describe("createDisplayNone", () => {
  it("create display none below first", () => {
    expect(createDisplayNone()).toEqual({})
    expect(createDisplayNone(["xs", "lg"], breakpoints)).toStrictEqual({
      "@media (min-width:0px) and (max-width:599.95px)": {
        display: "none",
      },
      "@media (min-width:1280px) and (max-width:1919.95px)": {
        display: "none",
      },
    })
  })
})

describe("createHiddenStyles", () => {
  it("sortBreakpoints", () => {
    expect(sortBreakpoints(["lg", "sm", "xs", "md"])).toEqual([
      "xs",
      "sm",
      "md",
      "lg",
    ])
  })

  it("getVisibleRange", () => {
    expect(getVisibleRange(["sm", "xl"])).toEqual(["sm", "md", "lg", "xl"])
  })

  it("getBreakpointUpper", () => {
    expect(getBreakpointUpper("xs")).toEqual("sm")
    expect(getBreakpointUpper("xl")).toBeUndefined()
  })

  it("getBreakpointBelow", () => {
    expect(getBreakpointBelow("md")).toEqual("sm")
    expect(getBreakpointBelow("xs")).toBeUndefined()
  })

  it("getVisibleRangeFromSiblings", () => {
    expect(getVisibleRangeFromSiblings({ xs: {}, md: {} }, [])).toEqual([
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
    ])
    expect(
      getVisibleRangeFromSiblings({ sm: {}, md: {} }, [{ xl: {} }])
    ).toEqual(["sm", "md", "lg"])
  })

  it("create media queries with display none", () => {
    expect(createHiddenStyles()).toEqual({})
    expect(
      createHiddenStyles({ xs: {}, md: {} }, [], breakpoints)
    ).toStrictEqual({})
    expect(
      createHiddenStyles({ xs: {}, md: {} }, [{ xl: {} }], breakpoints)
    ).toStrictEqual({
      "@media (min-width:1920px)": {
        display: "none",
      },
    })
  })
})

describe("combineBreakpoints", () => {
  it("combine correctly", () => {
    expect(
      combineBreakpoints({ xs: "", lg: "" }, { md: "", lg: "" }, { sm: "" })
    ).toEqual(["xs", "sm", "md", "lg"])
  })
})

describe("pickNearestBreakpoint", () => {
  it("should return matched breakpoint value", () => {
    const value = {
      xs: "xs",
      md: "md",
      xl: "xl",
    }
    expect(pickNearestBreakpoint(value, "xs")).toEqual("xs")
    expect(pickNearestBreakpoint(value, "xl")).toEqual("xl")
  })

  it("should return nearest breakpoint value if target not found", () => {
    const value = {
      xs: "xs",
      md: "md",
      xl: "xl",
    }
    expect(pickNearestBreakpoint(value, "lg")).toEqual("md")
  })
})

describe("createBreakpointStyles", () => {
  it("turns into media queries object", () => {
    expect(
      createBreakpointStyles(
        {
          xs: { margin: 0 },
          sm: { margin: 1 },
          md: { margin: 2 },
          lg: { margin: 3 },
          xl: { margin: 4 },
        },
        breakpoints
      )
    ).toEqual({
      margin: 0,
      "@media (min-width:600px)": {
        margin: 1,
      },
      "@media (min-width:960px)": {
        margin: 2,
      },
      "@media (min-width:1280px)": {
        margin: 3,
      },
      "@media (min-width:1920px)": {
        margin: 4,
      },
    })
  })

  it("mix media queries", () => {
    const result = createBreakpointStyles(
      {
        sm: {
          margin: 2,
        },
      },
      breakpoints
    )
    expect(result).toEqual({
      "@media (min-width:600px)": {
        margin: 2,
      },
    })
  })
})
