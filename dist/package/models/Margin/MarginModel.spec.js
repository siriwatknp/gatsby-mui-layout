"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MarginModel_1 = require("./MarginModel");
describe("combineMargin", () => {
    it("return correct margin", () => {
        expect(MarginModel_1.combineMargin(undefined, undefined)).toBeUndefined();
        expect(MarginModel_1.combineMargin({ marginLeft: 256 }, undefined)).toEqual({
            marginLeft: 256,
        });
        expect(MarginModel_1.combineMargin(undefined, { marginRight: "30%" })).toEqual({
            marginRight: "30%",
        });
        expect(MarginModel_1.combineMargin({ marginLeft: 256 }, { marginRight: -80 })).toEqual({
            marginLeft: 256,
            marginRight: -80,
        });
        expect(MarginModel_1.combineMargin({ marginLeft: 256 }, { marginLeft: "12%", marginRight: 80 })).toEqual({
            marginLeft: "256px + 12%",
            marginRight: 80,
        });
    });
});
describe("createMarginInterface", () => {
    it("can combine margin", () => {
        const m1 = MarginModel_1.default({ marginLeft: 64, marginRight: "20%" });
        const m2 = MarginModel_1.default({ marginRight: "-12%" });
        expect(m1.combine(m2).value).toEqual({
            marginLeft: 64,
            marginRight: "20% + -12%",
        });
        expect(m1.combine(m2).getStyle()).toEqual({
            marginLeft: 64,
            marginRight: "calc(20% + -12%)",
        });
    });
});
//# sourceMappingURL=MarginModel.spec.js.map