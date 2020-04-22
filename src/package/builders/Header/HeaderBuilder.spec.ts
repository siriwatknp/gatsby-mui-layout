import HeaderBuilder from "./HeaderBuilder"

it("can create config and return correct config", () => {
  const header = HeaderBuilder()
  expect(header.getConfig()).toEqual({})

  const xsConfig = {
    id: "header",
    clipped: true,
    position: "sticky" as const,
  }
  const mdConfig = {
    id: "header",
    clipped: false,
    position: "fixed" as const,
  }
  header
    .create("header")
    .registerConfig("xs", xsConfig)
    .registerConfig("md", mdConfig)
  expect(header.getConfig()).toEqual({
    xs: xsConfig,
    md: mdConfig,
  })
  expect(header.getBreakpointConfig("md")).toEqual(mdConfig)
  // will return lower breakpoint if not found
  expect(header.getBreakpointConfig("lg")).toEqual(mdConfig)
})
