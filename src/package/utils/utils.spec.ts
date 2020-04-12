import pickNearestBreakpoint from "./pickNearestBreakpoint"

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
