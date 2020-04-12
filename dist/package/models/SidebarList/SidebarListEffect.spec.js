"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SidebarListEffect_1 = require("./SidebarListEffect");
const PersistentSidebar_1 = require("../PersistentSidebar");
describe("SidebarListEffect", () => {
    it("return correct style", () => {
        const effect1 = PersistentSidebar_1.createPersistentSidebarEffect({
            id: "primarySidebar",
            anchor: "left",
            width: 256,
            persistentBehavior: "fit",
            collapsible: true,
            collapsedWidth: 80,
        }, { sidebar: { primarySidebar: { open: true } } });
        const effect2 = PersistentSidebar_1.createPersistentSidebarEffect({
            id: "secondarySidebar",
            anchor: "right",
            width: 200,
            persistentBehavior: "none",
            collapsible: true,
            collapsedWidth: 64,
        }, { sidebar: { secondarySidebar: { open: true, collapsed: true } } });
        const sidebarListEffect = SidebarListEffect_1.default([effect1, effect2]);
        expect(sidebarListEffect.widthStyle).toEqual({
            width: "calc(100% - 256px)",
        });
        expect(sidebarListEffect.marginStyle).toEqual({
            marginLeft: 256,
            marginRight: 0,
        });
    });
});
//# sourceMappingURL=SidebarListEffect.spec.js.map