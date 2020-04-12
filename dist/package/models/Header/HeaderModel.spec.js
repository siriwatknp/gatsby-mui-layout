"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HeaderModel_1 = require("./HeaderModel");
const PersistentSidebar_1 = require("../PersistentSidebar");
describe("HeaderModel", () => {
    let headerConfig;
    let sidebarConfig;
    let state;
    beforeEach(() => {
        headerConfig = {
            id: "appHeader",
            position: "fixed",
            clipped: false,
        };
        sidebarConfig = {
            id: "appSidebar",
            anchor: "left",
            collapsible: true,
            width: 256,
            collapsedWidth: 64,
            persistentBehavior: {
                appHeader: "fit",
            },
        };
        state = { sidebar: { appSidebar: { open: true, collapsed: false } } };
    });
    it("[Unclipped Header] return correct style", () => {
        const sidebarEffect = PersistentSidebar_1.createPersistentSidebarEffect(sidebarConfig, state);
        const model = HeaderModel_1.default(headerConfig, [sidebarEffect]);
        expect(model.getStyle()).toEqual({
            width: "calc(100% - 256px)",
            marginLeft: 256,
        });
    });
    it("[Clipped Header] return correct style", () => {
        headerConfig.clipped = true;
        const sidebarEffect = PersistentSidebar_1.createPersistentSidebarEffect(sidebarConfig, state);
        const model = HeaderModel_1.default(headerConfig, [sidebarEffect]);
        expect(model.getStyle()).toEqual({
            zIndex: 1210,
        });
    });
});
//# sourceMappingURL=HeaderModel.spec.js.map