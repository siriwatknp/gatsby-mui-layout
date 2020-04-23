import createBreakpoints from "@material-ui/core/styles/createBreakpoints"
import InsetAvoidingViewCompiler from "./InsetAvoidingViewCompiler"

const breakpoints = createBreakpoints({})

describe("InsetAvoidingViewModel", () => {
  it("mixed anchor return correct styles", () => {
    const compiler = InsetAvoidingViewCompiler({
      configMap: {
        sm: [
          {
            width: 256,
            anchor: "left" as const,
            variant: "fixed" as const,
          },
          {
            width: "5rem",
            anchor: "right" as const,
            variant: "fixed" as const,
          },
        ],
        lg: [
          {
            width: 256,
            anchor: "left" as const,
            variant: "fixed" as const,
          },
          {
            width: 256,
            top: 0,
            variant: "sticky" as const,
          },
        ],
      },
    })
    expect(compiler.getMediaQueryStyle(breakpoints)).toStrictEqual({
      "@media (min-width:1280px) and (max-width:1919.95px)": {
        marginLeft: 256,
      },
      "@media (min-width:600px) and (max-width:959.95px)": {
        marginLeft: 256,
        marginRight: "5rem",
      },
    })
  })
})
