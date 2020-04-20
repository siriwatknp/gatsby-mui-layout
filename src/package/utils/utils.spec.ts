import each from "jest-each"
import createBreakpoints from "@material-ui/core/styles/createBreakpoints"
import pickNearestBreakpoint from "./pickNearestBreakpoint"
import createBreakpointStyles from "./createBreakpointStyles"
import combineBreakpoints from "./combineBreakpoints"
import createDisplayNone from "./createDisplayNone"
import createHiddenStyles, {
  sortBreakpoints,
  getHiddenRange,
} from "./createHiddenStyles"
import getFlexBehaviorValue from "./getFlexBehaviorValue"
import getSidebarAnchor from "./getSidebarAnchor"
import mapWidthToScreen from "./mapWidthToScreen"

const breakpoints = createBreakpoints({})

describe("mapWidthToScreen", () => {
  it("return correct screen", () => {
    expect(mapWidthToScreen(undefined, breakpoints)).toBeUndefined()
    expect(mapWidthToScreen(320, breakpoints)).toBe("xs")
    expect(mapWidthToScreen(768, breakpoints)).toBe("sm")
    expect(mapWidthToScreen(1024, breakpoints)).toBe("md")
    expect(mapWidthToScreen(1440, breakpoints)).toBe("lg")
    expect(mapWidthToScreen(1920, breakpoints)).toBe("xl")
  })
})

describe("getSidebarAnchor", () => {
  it("return correct anchor", () => {
    expect(
      getSidebarAnchor({
        md: { anchor: "left" as const },
        lg: { anchor: "left" as const }
      })
    ).toEqual('left')
  })
})

describe("getFlexBehaviorValue", () => {
  each([
    ["left", 300, 300],
    ["left", "30%", "30%"],
    ["right", "40rem", "-40rem"],
    ["right", 256, -256],
  ]).test(
    "return %s when addding %s and %s",
    (anchor, currentWidth, result) => {
      expect(getFlexBehaviorValue(anchor, currentWidth)).toEqual(result)
    }
  )
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

  it("getHiddenRange", () => {
    expect(getHiddenRange({ sm: {}, md: {} }, [])).toEqual(["xs"])
    expect(getHiddenRange({ sm: {}, md: {} }, [{ xl: {} }])).toEqual([
      "xs",
      "xl",
    ])
    expect(
      getHiddenRange({ xs: {} }, [{ sm: {}, md: {} }, { xl: {} }])
    ).toEqual(["sm", "md", "lg", "xl"])
    expect(getHiddenRange({ xs: {}, sm: {} }, [{ lg: {} }])).toEqual([
      "lg",
      "xl",
    ])
    expect(getHiddenRange({ xs: {}, sm: {}, xl: {} }, [{ md: {} }])).toEqual([
      "md",
      "lg",
    ])
    expect(getHiddenRange({ lg: {} }, [{ sm: {} }])).toEqual(["xs", "sm", "md"])
    expect(getHiddenRange({ md: {} }, [{ sm: {} }, { xl: {} }])).toEqual([
      "xs",
      "sm",
      "xl",
    ])
    expect(
      getHiddenRange({ sm: {}, lg: {} }, [{ xs: {} }, { md: {} }, { xl: {} }])
    ).toEqual(["xs", "md", "xl"])
    expect(
      getHiddenRange({ xs: {}, md: {} }, [{ sm: {} }, { xl: {} }])
    ).toEqual(["sm", "xl"])
    expect(
      getHiddenRange({ md: {}, xl: {} }, [{ xs: {} }, { lg: {} }])
    ).toEqual(["xs", "sm", "lg"])
  })

  it("create media queries with display none", () => {
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
    expect(
      createHiddenStyles(
        { xs: {} },
        [{ sm: {}, md: {} }, { xl: {} }],
        breakpoints
      )
    ).toStrictEqual({
      "@media (min-width:600px) and (max-width:959.95px)": {
        display: "none",
      },
      "@media (min-width:960px) and (max-width:1279.95px)": {
        display: "none",
      },
      "@media (min-width:1280px) and (max-width:1919.95px)": {
        display: "none",
      },
      "@media (min-width:1920px)": {
        display: "none",
      },
    })
    expect(
      createHiddenStyles({ xs: {}, xl: {} }, [{ md: {} }], breakpoints)
    ).toStrictEqual({
      "@media (min-width:960px) and (max-width:1279.95px)": {
        display: "none",
      },
      "@media (min-width:1280px) and (max-width:1919.95px)": {
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
