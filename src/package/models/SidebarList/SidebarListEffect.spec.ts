import createEffect from "./SidebarListEffect"
import { createPersistentSidebarEffect } from "../PersistentSidebar"

describe("SidebarListEffect", () => {
  it("return correct style", () => {
    const effect1 = createPersistentSidebarEffect(
      {
        id: "primary-sidebar",
        anchor: "left",
        width: 256,
        persistentBehavior: "fit",
        collapsible: true,
        collapsedWidth: 80,
      },
      { open: true, collapsed: false }
    )
    const effect2 = createPersistentSidebarEffect(
      {
        id: "secondary-sidebar",
        anchor: "right",
        width: 200,
        persistentBehavior: "none",
        collapsible: true,
        collapsedWidth: 64,
      },
      { open: true, collapsed: true }
    )
    const sidebarListEffect = createEffect([effect1, effect2])
    expect(sidebarListEffect.widthStyle).toEqual({
      width: 'calc(100% - 256px)'
    })
    expect(sidebarListEffect.marginStyle).toEqual({
      marginLeft: 256,
      marginRight: 0,
    })
  })
})
