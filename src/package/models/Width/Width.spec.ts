import { getCssWidth } from "./WidthModel"

describe("getCssWidth", () => {
  it("return correctly", () => {
    expect(getCssWidth()).toEqual("auto")
    expect(getCssWidth("30px + 40rem")).toEqual("calc(100% - (30px + 40rem))")
    expect(getCssWidth("30%")).toEqual("calc(100% - (30%))")
    expect(getCssWidth(0)).toEqual("100%")
    expect(getCssWidth(100)).toEqual("calc(100% - 100px)")
  })
})
