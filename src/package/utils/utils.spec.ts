import createBreakpoints from "@material-ui/core/styles/createBreakpoints"
import pickNearestBreakpoint from "./pickNearestBreakpoint"
import createBreakpointStyles from "./createBreakpointStyles"
import combineBreakpoints from "./combineBreakpoints"

describe("combineBreakpoints", () => {
  it("combine correctly", () => {
    expect(
      combineBreakpoints({ xs: "", lg: "" }, { md: "", lg: "" }, { sm: "" })
    ).toEqual(["xs", "lg", "md", "sm"])
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

const breakpoints = createBreakpoints({})

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
