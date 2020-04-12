"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseSidebarModel_1 = require("./BaseSidebarModel");
describe("BaseSidebarModel", () => {
    let baseConfig;
    beforeEach(() => {
        baseConfig = {
            id: "s1",
            anchor: "left",
            collapsedWidth: 80,
            collapsible: true,
            width: "30%",
        };
    });
    it("return the width before collapsed", () => {
        let model = BaseSidebarModel_1.default(baseConfig);
        expect(model).toEqual({
            currentWidth: "30%",
        });
    });
    it("return the collapsed width", () => {
        let model = BaseSidebarModel_1.default(baseConfig, {
            sidebar: { s1: { collapsed: true } },
        });
        expect(model).toEqual({
            currentWidth: 80,
        });
    });
});
//# sourceMappingURL=BaseSidebarModel.spec.js.map