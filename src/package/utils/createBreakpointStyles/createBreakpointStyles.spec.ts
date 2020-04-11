import createBreakpoints from "@material-ui/core/styles/createBreakpoints"
import createBreakpointStyles from "./createBreakpointStyles"

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
        padding: 0,
        sm: {
          margin: 2,
        },
      },
      breakpoints
    )
    expect(result).toEqual({
      padding: 0,
      "@media (min-width:600px)": {
        margin: 2,
      },
    })
  })
})
