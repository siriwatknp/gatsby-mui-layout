"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WidthModel_1 = require("./WidthModel");
describe("getCssWidth", () => {
    it("return correctly", () => {
        expect(WidthModel_1.getCssWidth()).toEqual("auto");
        expect(WidthModel_1.getCssWidth("30px + 40rem")).toEqual("calc(100% - (30px + 40rem))");
        expect(WidthModel_1.getCssWidth("30%")).toEqual("calc(100% - (30%))");
        expect(WidthModel_1.getCssWidth(0)).toEqual("100%");
        expect(WidthModel_1.getCssWidth(100)).toEqual("calc(100% - 100px)");
    });
});
describe("sumExternalGap", () => {
    it("return correct value", () => {
        expect(WidthModel_1.sumExternalGap(256, 80)).toEqual("256px + 80px");
        expect(WidthModel_1.sumExternalGap(0, "30%")).toEqual("30%");
        expect(WidthModel_1.sumExternalGap(80, "30%")).toEqual("80px + 30%");
        expect(WidthModel_1.sumExternalGap(0, 0)).toEqual(0);
        expect(WidthModel_1.sumExternalGap("40rem", null)).toEqual("40rem");
        expect(WidthModel_1.sumExternalGap("", null)).toEqual(undefined);
    });
});
describe("createWidthObject", () => {
    it("return correct gap after combining", () => {
        const w1 = WidthModel_1.default(80);
        const w2 = WidthModel_1.default("30%");
        expect(w1.combine(w2).value).toEqual("80px + 30%");
        expect(w1.combine(w2).getStyle()).toEqual({
            width: "calc(100% - (80px + 30%))",
        });
    });
});
//# sourceMappingURL=WidthModel.spec.js.map