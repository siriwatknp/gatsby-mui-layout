import createEffect from "./SidebarListEffect"
import { createPersistentSidebarEffect } from "../../effects/PersistentSidebar"

describe("SidebarListEffect", () => {
  it("return correct style", () => {
    const effect1 = createPersistentSidebarEffect(
      {
        id: "primarySidebar",
        anchor: "left",
        width: 256,
        persistentBehavior: "fit",
        collapsible: true,
        collapsedWidth: 80,
      },
      { sidebar: { primarySidebar: { open: true } } }
    )
    const effect2 = createPersistentSidebarEffect(
      {
        id: "secondarySidebar",
        anchor: "right",
        width: 200,
        persistentBehavior: "none",
        collapsible: true,
        collapsedWidth: 64,
      },
      { sidebar: { secondarySidebar: { open: true, collapsed: true } } }
    )
    const sidebarListEffect = createEffect([effect1, effect2])
    expect(sidebarListEffect.widthStyle).toEqual({
      width: "calc(100% - 256px)",
    })
    expect(sidebarListEffect.marginStyle).toEqual({
      marginLeft: 256,
      marginRight: 0,
    })
  })
})
