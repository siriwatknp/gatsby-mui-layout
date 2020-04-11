export const getCssWidth = (externalGap?: string | number) => {
  if (typeof externalGap === "string") {
    return `calc(100% - (${externalGap}))`
  }
  if (typeof externalGap === "number") {
    if (externalGap === 0) return "100%"
    return `calc(100% - ${externalGap}px)`
  }
  return "auto"
}
