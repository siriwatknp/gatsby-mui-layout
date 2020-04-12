"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SidebarBuilder_1 = require("./SidebarBuilder");
it("can check unique sidebars", () => {
    expect(SidebarBuilder_1.isUniqueSidebars([
        {
            id: "sidebar-1",
        },
        {
            id: "sidebar-1",
        },
        {
            id: "sidebar-2",
        },
    ])).toBeFalsy();
});
it("can create config and get the correct config", () => {
    const sidebar = SidebarBuilder_1.default();
    sidebar.createPersistentSidebarConfig("xs", {
        id: "sidebar-1",
        anchor: "left",
        width: 256,
        collapsible: true,
        collapsedWidth: 80,
        persistentBehavior: "fit",
    });
});
//# sourceMappingURL=SidebarBuilder.spec.js.map