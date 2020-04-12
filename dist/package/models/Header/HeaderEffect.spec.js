"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HeaderEffect_1 = require("./HeaderEffect");
describe("HeaderEffect", function () {
    it("isSomeClipped return correct value", () => {
        expect(HeaderEffect_1.isSomeClipped({ clipped: false })).toBeFalsy();
        expect(HeaderEffect_1.isSomeClipped({ clipped: { "sidebar-1": false, "sidebar-2": false } })).toBeFalsy();
        expect(HeaderEffect_1.isSomeClipped({ clipped: { "sidebar-1": false, "sidebar-2": true } })).toBeTruthy();
    });
    it("return undefined if no 'clipped' config in header", () => {
        let model = HeaderEffect_1.default({
            id: "appHeader",
            position: "relative",
        });
        expect(model.getHeaderZIndex()).toBeUndefined();
        expect(model.getEdgeSidebarZIndex("some-sidebar")).toBeUndefined();
    });
    it("return correct header zIndex (single sidebar)", () => {
        let model = HeaderEffect_1.default({
            id: "appHeader",
            position: "sticky",
            clipped: { "sidebar-1": true },
        });
        expect(model.getHeaderZIndex()).toEqual({
            zIndex: 1210,
        });
        expect(model.getEdgeSidebarZIndex("sidebar-1")).toBeUndefined();
    });
    it("return correct header zIndex (multiple sidebars)", () => {
        let model = HeaderEffect_1.default({
            id: "appHeader",
            position: "sticky",
            clipped: { "sidebar-1": false, "sidebar-2": true },
        });
        expect(model.getHeaderZIndex()).toEqual({
            zIndex: 1210,
        });
        expect(model.getEdgeSidebarZIndex("sidebar-1")).toEqual({
            zIndex: 1220,
        });
        expect(model.getEdgeSidebarZIndex("sidebar-3")).toBeUndefined();
    });
});
//# sourceMappingURL=HeaderEffect.spec.js.map