import createModel from "./HeaderModel"
import { createPersistentSidebarEffect } from "../PersistentSidebar"
import { HeaderConfig, PersistentSidebarConfig, State } from "../../types"

describe("HeaderModel", () => {
  let headerConfig: HeaderConfig
  let sidebarConfig: PersistentSidebarConfig
  let state: State
  beforeEach(() => {
    headerConfig = {
      id: "header",
      position: "fixed" as const,
      clipped: false,
    }
    sidebarConfig = {
      id: "sidebar",
      anchor: "left" as const,
      collapsible: true,
      width: 256,
      collapsedWidth: 64,
      persistentBehavior: {
        header: "fit" as const,
      },
    }
    state = { open: true, collapsed: false }
  })
  it("[Unclipped Header] return correct style", () => {
    const sidebarEffect = createPersistentSidebarEffect(sidebarConfig, state)
    const model = createModel(headerConfig, [sidebarEffect])
    expect(model.getStyle()).toEqual({
      width: "calc(100% - 256px)",
      marginLeft: 256,
    })
  })

  it("[Clipped Header] return correct style", () => {
    headerConfig.clipped = true
    const sidebarEffect = createPersistentSidebarEffect(sidebarConfig, state)
    const model = createModel(headerConfig, [sidebarEffect])
    expect(model.getStyle()).toEqual({
      zIndex: 1210,
    })
  })
})
