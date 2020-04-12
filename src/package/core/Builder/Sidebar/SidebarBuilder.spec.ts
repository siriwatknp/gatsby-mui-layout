import SidebarBuilder, { isUniqueSidebars } from "./SidebarBuilder"

it("can check unique sidebars", () => {
  expect(
    isUniqueSidebars([
      {
        id: "sidebar-1",
      },
      {
        id: "sidebar-1",
      },
      {
        id: "sidebar-2",
      },
    ])
  ).toBeFalsy()
})

it("can create config and get the correct config", () => {
  const sidebar = SidebarBuilder();
  sidebar.createPersistentSidebarConfig("xs", {
    id: "sidebar-1",
    anchor: "left",
    width: 256,
    collapsible: true,
    collapsedWidth: 80,
    persistentBehavior: "fit",
  })

})
