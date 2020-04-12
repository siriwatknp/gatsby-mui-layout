"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HeaderBuilder_1 = require("./HeaderBuilder");
const SidebarBuilder_1 = require("../Sidebar/SidebarBuilder");
it("can create config and return correct config", () => {
    const initialConfig = {
        id: "header",
        clipped: true,
        position: "sticky",
    };
    const header = HeaderBuilder_1.default(initialConfig);
    expect(header.getConfig()).toEqual({
        xs: initialConfig,
    });
    const mdConfig = {
        id: "header",
        clipped: false,
        position: "fixed",
    };
    header.createConfig("md", mdConfig);
    expect(header.getConfig()).toEqual({
        xs: initialConfig,
        md: mdConfig,
    });
    expect(header.getBreakpointConfig("md")).toEqual(mdConfig);
    // will return lower breakpoint if not found
    expect(header.getBreakpointConfig("lg")).toEqual(mdConfig);
    expect(header.getBreakpointEffect("md").getEdgeSidebarZIndex()).toBeUndefined();
});
it("return correct result style", () => {
    const header = HeaderBuilder_1.default({
        id: "header",
        clipped: true,
        position: "sticky",
    });
    header.createConfig("md", {
        id: "header",
        clipped: false,
        position: "sticky",
    });
    const sidebar = SidebarBuilder_1.default();
    sidebar.createPersistentSidebarConfig("xs", {
        id: "sidebar-1",
        anchor: "left",
        width: 256,
        collapsible: true,
        collapsedWidth: 80,
        persistentBehavior: "fit",
    });
    expect(header.getResultStyle({ sidebar: { "sidebar-1": { open: true } } }, sidebar)).toStrictEqual({
        xs: {
            zIndex: 1210,
        },
        md: {
            width: "calc(100% - 256px)",
            marginLeft: 256,
        },
    });
});
it("does not create breakpoint if effect not found", () => {
    const header = HeaderBuilder_1.default();
    header.createConfig("sm", {
        id: "header",
        clipped: true,
        position: "sticky",
    });
    const sidebar = SidebarBuilder_1.default();
    sidebar.createPersistentSidebarConfig("md", {
        id: "sidebar-1",
        anchor: "left",
        width: 256,
        collapsible: true,
        collapsedWidth: 80,
        persistentBehavior: "fit",
    });
    expect(header.getResultStyle({ sidebar: { "sidebar-1": { open: true } } }, sidebar)).toEqual({});
});
//# sourceMappingURL=HeaderBuilder.spec.js.map