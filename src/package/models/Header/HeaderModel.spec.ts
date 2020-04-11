import createModel from "./HeaderModel"
import { createPersistentSidebarEffect } from "../PersistentSidebar"

describe("HeaderModel", () => {
  it("return correct style", () => {
    const headerConfig = {
      id: "header",
      position: "fixed" as const,
      clipped: true,
    }
    const sidebarConfig = {
      id: "sidebar",
      anchor: "left" as const,
      collapsible: true,
      width: 256,
      collapsedWidth: 64,
      persistentBehavior: {
        header: "fit" as const,
      },
    }
    const state = { open: true, collapsed: false }
    const sidebarEffect = createPersistentSidebarEffect(sidebarConfig, state)
    const model = createModel(headerConfig, { sidebarEffect })
    expect(model.getStyle()).toEqual({
      width: "calc(100% - 256px)",
      marginLeft: 256,
      zIndex: 1210,
    })
  })
})
