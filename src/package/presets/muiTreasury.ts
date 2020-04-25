import LayoutBuilder from "../builders"

const scheme = LayoutBuilder()

scheme.configureHeader(builder => {
  builder
    .create("appHeader")
    .registerConfig("xs", {
      position: "sticky",
      initialHeight: 56,
    })
    .registerConfig("md", {
      position: "sticky",
      initialHeight: 64,
      clipped: true,
    })
})

scheme.configureEdgeSidebar(builder => {
  builder
    .create("primarySidebar", {
      anchor: "left",
    })
    .registerTemporaryConfig("xs", {
      width: 256,
    })
    .registerPermanentConfig("md", {
      width: 200,
      collapsible: true,
      collapsedWidth: 64,
    })
    .registerPermanentConfig("lg", {
      width: 256,
      collapsible: false,
    })
})

export default scheme
